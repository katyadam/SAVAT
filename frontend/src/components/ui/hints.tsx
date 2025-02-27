export const CallGraphOutputHint = () => (
  <div>
    <ul className="space-y-2">
      <li className="flex items-center">
        <span className="w-6 h-0.5 border-dashed border-green-500 border-2 mr-2"></span>
        <span>Added method</span>
      </li>
      <li className="flex items-center">
        <span className="w-6 h-0.5 border-dashed border-red-500 border-2 mr-2"></span>
        <span>Removed method</span>
      </li>
      <li className="flex items-center">
        <span className="w-6 h-0.5 border-dashed border-blue-500 border-2 mr-2"></span>
        <span>Modified method</span>
      </li>
    </ul>
  </div>
);

export const CallGraphInputHint = () => (
  <div>
    <ul className="space-y-2">
      <li className="flex items-center">
        <span className="w-6 0.5  border-dashed border-2 border-red-500 mr-2"></span>
        <span>API Call</span>
      </li>
    </ul>
  </div>
);

export const LinkDifferencesHint = () => (
  <div>
    <ul className="space-y-2">
      <li className="flex items-center">
        <span className="w-8 h-3 border-2 border-green-500 bg-green-500 mr-2"></span>
        <span>Added Link</span>
      </li>
      <li className="flex items-center">
        <span className="w-8 h-3 border-2 border-red-500 bg-red-500 mr-2"></span>
        <span>Removed Link</span>
      </li>
      <li className="flex items-center">
        <span className="w-8 h-3 border-2 border-blue-500 bg-blue-500 mr-2"></span>
        <span>Modified Link</span>
      </li>
    </ul>
  </div>
);
