// src/components/Loader.jsx
const Loader = () => {
  return (
<div className="p-4 max-w-xl mx-auto text-center animate-pulse flex flex-col items-center gap-4 w-90">
  <div>
    <div className="w-48 h-6 bg-slate-400 rounded-md"></div>
    <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
  </div>
  <div className="h-7 bg-slate-400 w-full rounded-md"></div>
  <div className="h-7 bg-slate-400 w-full rounded-md"></div>
  <div className="h-7 bg-slate-400 w-full rounded-md"></div>
  <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
</div>
  );
};

export default Loader;
