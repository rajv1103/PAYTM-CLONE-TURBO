export default function HelpPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-purple-700 mb-6">Help & Support</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium">How do I add money?</h2>
          <p className="text-sm text-gray-600">
            Go to the Transfer section and click on "Add Money". Follow the instructions to use your preferred payment method.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">How do I contact support?</h2>
          <p className="text-sm text-gray-600">
            Email us at <a className="text-purple-600" href="mailto:support@myfinance.com">support@myfinance.com</a>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">How can I reset my password?</h2>
          <p className="text-sm text-gray-600">
            Go to Account settings and click "Reset Password". A reset link will be emailed to you.
          </p>
        </div>
      </div>
    </div>
  );
}
