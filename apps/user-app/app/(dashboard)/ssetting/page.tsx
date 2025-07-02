export default function SettingsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold text-purple-700 mb-6">Settings</h1>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Dark Mode</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Language</label>
          <select className="mt-1 p-2 border rounded-md">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Save Settings
        </button>
      </div>
    </div>
  );
}
