import useAppStore from '@stores';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Loader() {
  const { setLoader, loader } = useAppStore.general((state) => state);

  useEffect(() => {
    if (loader) setTimeout(() => setLoader(false), 2000);
  }, [loader]);

  return (
    <div className="absolute top-10 right-[2em] box-border">
      <AnimatePresence>
        {loader && (
          <motion.div
            initial={{ y: '-60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            className="flex items-center w-48 gap-4 p-3 border rounded-lg shadow-xl bg-base-100"
          >
            <div className="w-5 h-5 rounded-full border-l-primary border-base-300 border-[3px] animate-spin"></div>
            <p className=" animate-pulse">Please wait . . . </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
