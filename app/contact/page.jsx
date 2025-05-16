import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <main className="flex-grow">
        <section className="min-h-[60vh] py-20 px-6 md:px-20">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-700 mb-4">
            We’d love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
          <div className="text-gray-600">
            <p>Email: <a href="mailto:support@aicruiter.com" className="text-blue-600 hover:underline">support@aicruiter.com</a></p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 AI Street, San Francisco, CA</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
