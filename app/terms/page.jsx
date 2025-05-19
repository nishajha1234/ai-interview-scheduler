import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <main className="flex-grow">
        <section className="min-h-[60vh] py-16 px-6 md:px-20 text-left">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
            Welcome to AiCruiter. By using our service, you agree to be bound by the following terms and conditions. If you do not agree, please do not use our platform.
          </p>
          <ul className="list-disc pl-5 sm:pl-6 text-gray-600 space-y-3 text-base sm:text-lg">
            <li>You must be 18 years or older to use this service.</li>
            <li>You are responsible for maintaining the security of your account.</li>
            <li>We reserve the right to suspend or terminate accounts violating our policies.</li>
            <li>We may update these terms periodically. Continued use indicates acceptance.</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
