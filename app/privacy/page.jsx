import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <main className="flex-grow">
        <section className="min-h-[60vh] py-16 px-6 md:px-20 text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
            AiCruiter respects your privacy and is committed to protecting the personal information you share with us.
          </p>
          <ul className="list-disc pl-5 sm:pl-6 text-gray-600 space-y-3 text-base sm:text-lg">
            <li>We collect only necessary information to provide and improve our service.</li>
            <li>Your data is never sold or shared with third parties without consent.</li>
            <li>We use secure practices to store and handle all information.</li>
            <li>You are in control of your personal information and can request its removal from our systems at any time.</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
