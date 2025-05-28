"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/Services/supabaseClient';
import TimeInputWithAMPM from './components/Time';
import { toast } from 'sonner';
import { useUser } from '@/app/provider';

export default function CreatePhoneScreening() {
    const router = useRouter();
    const { user, loading } = useUser();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
    });
    const [loadingForm, setLoadingForm] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/auth');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const name = params.get('name') || '';
            const email = params.get('email') || '';
            const phone = params.get('phone') || '';
            setForm((prev) => ({ ...prev, name, email, phone }));
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { name, email, phone, date, time } = form;

        if (!(name && email && phone && date && time)) {
            toast.error('All fields are required.');
            return false;
        }

        const nameRegex = /^[a-zA-Z ]{2,}$/;
        if (!nameRegex.test(name.trim())) {
            toast.error('Enter a valid name (only letters and spaces).');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Enter a valid email address.');
            return false;
        }

        const phoneRegex = /^\d{10,12}$/;
        if (!phoneRegex.test(phone)) {
            toast.error('Enter a valid phone number.');
            return false;
        }

        const timeParts = time.split(' ');
        if (timeParts.length !== 2) {
            toast.error('Invalid time format.');
            return false;
        }

        const [hours, minutes] = timeParts[0].split(':');
        const ampm = timeParts[1];

        const formattedTime = new Date(date);
        formattedTime.setHours(
            ampm === 'PM' && hours !== '12' ? parseInt(hours) + 12 : parseInt(hours)
        );
        formattedTime.setMinutes(parseInt(minutes));

        const now = new Date();
        if (formattedTime <= now) {
            toast.error('Scheduled time must be in the future.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const timeParts = form.time.split(' ');
        const [hourStr] = timeParts[0].split(':');
        let hour = parseInt(hourStr);

        if (timeParts[1] === 'PM' && hour !== 12) hour += 12;
        if (timeParts[1] === 'AM' && hour === 12) hour = 0;

        if (hour >= 0 && hour < 6) {
            toast("Are you sure you want to schedule this interview at night between 12 AM – 6 AM ?", {
                action: {
                    label: "Yes, Proceed",
                    onClick: async () => {
                        await submitScreening();
                    },
                },
            });
            return;
        }

        await submitScreening();
    };

    const submitScreening = async () => {
        setLoadingForm(true);
        try {
            const {
                data: { user: currentUser },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !currentUser) {
                toast.error('User not authenticated');
                setLoadingForm(false);
                return;
            }

            const { error } = await supabase.from('candidates').insert([
                {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    screening_date: form.date,
                    screening_time: form.time,
                    user_id: currentUser.id,
                },
            ]);

            if (error) {
                console.error('Supabase insert error:', error);
                toast.error('Supabase insert error: ' + error.message);
                setLoadingForm(false);
                return;
            }

            toast.success('Phone screening scheduled successfully!');
            router.push('/scheduled-calls');
        } catch (err) {
            console.error('Unexpected error:', err);
            toast.error('Failed to schedule the phone screening. Please try again.');
        } finally {
            setLoadingForm(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    return (
        <div className="px-2 sm:px-4 md:px-6 lg:px-15 xl:px-55 pt-4">
            <div className="flex gap-5 items-center mb-7">
                <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
                <h2 className="font-bold text-2xl">Schedule Phone Screening Call</h2>
            </div>
            <div className="p-5 bg-white rounded-2xl">
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium">Candidate Name</Label>
                        <Input
                            placeholder="John"
                            className="mt-2"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium">Candidate Email</Label>
                        <Input
                            placeholder="john@gmail.com"
                            className="mt-2"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone" className="text-sm font-medium">Candidate Phone</Label>
                        <Input
                            placeholder="9865432103"
                            className="mt-2"
                            type="tel"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                            <Input
                                type="date"
                                className="mt-2"
                                id="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                onClick={e => {if (e.detail > 0) {e.currentTarget.showPicker?.();}}}
                            />
                            </div>
                        <div>
                            <TimeInputWithAMPM
                                value={form.time}
                                onChange={(newTime) => setForm({ ...form, time: newTime })}
                            />
                        </div>
                    </div>
                    <div className="pt-4 mt-5 text-center">
                        <Button className="cursor-pointer" type="submit" disabled={loadingForm}>
                            {loadingForm ? 'Scheduling...' : 'Schedule Phone Screening Call'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
