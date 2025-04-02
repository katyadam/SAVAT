export const CallGraphOutputHint = () => (
  <div>
    <ul className="space-y-2">
      <li className="flex items-center">
        <div className="w-10 h-7 border-dotted border-green-400 border-[4px] rounded-full mr-3"></div>
        <span>Added method</span>
      </li>
      <li className="flex items-center">
        <div className="w-10 h-7 border-dotted border-red-400 border-[4px] rounded-full mr-3"></div>
        <span>Removed method</span>
      </li>
      <li className="flex items-center">
        <div className="w-10 h-7 border-dotted border-blue-400 border-[4px] rounded-full mr-3"></div>
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

export const ContextMapOutputHint = () => (
  <div>
    <ul className="space-y-2">
      <li className="flex items-center">
        <div className="w-10 h-7 border-dotted border-green-400 border-[4px] rounded-full mr-3"></div>
        <span>Added entity</span>
      </li>
      <li className="flex items-center">
        <div className="w-10 h-7 border-dotted border-red-400 border-[4px] rounded-full mr-3"></div>
        <span>Removed entity</span>
      </li>
      <li className="flex items-center">
        <div className="w-10 h-7 border-dotted border-blue-400 border-[4px] rounded-full mr-3"></div>
        <span>Modified entity</span>
      </li>
    </ul>
  </div>
);
