import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdCancel, MdFileDownloadDone } from 'react-icons/md';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

const CreationPageNavButton = ({
  currentTab,
  loadingStatus,
  setCurrentTab,
  handleSubmit,
  MODE,
}: {
  currentTab: string;
  loadingStatus: 'free' | 'Processing' | 'Redirecting';
  setCurrentTab: React.Dispatch<
    React.SetStateAction<'description' | 'topic' | 'banner'>
  >;
  handleSubmit: () => Promise<void>;
  MODE: 'creation' | 'edit';
}) => {
  const router = useRouter();

  const onOutlineButtonClicked = () => {
    if (currentTab === 'description') router.push('/');
    else setCurrentTab(currentTab === 'banner' ? 'topic' : 'description');
  };

  const onGeneralButtonClicked = () => {
    if (currentTab !== 'banner')
      setCurrentTab(currentTab === 'description' ? 'topic' : 'banner');
    else handleSubmit();
  };

  function getButtonText() {
    if (currentTab !== 'banner') {
      return 'Next';
    } else if (loadingStatus === 'free') {
      return `Done ${MODE === 'creation' ? 'Creating' : 'Updating'} Course?`;
    } else {
      return loadingStatus;
    }
  }

  return (
    <div className="flex justify-center pt-6 space-x-3 items-center w-full">
      <Button
        variant="outline"
        className="flex space-x-2 items-center focus:ring-0"
        onClick={onOutlineButtonClicked}
      >
        {currentTab === 'description' ? <MdCancel /> : <IoIosArrowBack />}
        <p className="font-semibold">
          {currentTab === 'description' ? 'Cancel' : 'Previous'}
        </p>
      </Button>
      <Button
        variant="general"
        isLoading={loadingStatus !== 'free'}
        className="px-8 flex space-x-2 items-center focus:ring-0"
        onClick={onGeneralButtonClicked}
      >
        <p className="font-semibold">{getButtonText()}</p>

        {currentTab !== 'banner' ? (
          <IoIosArrowForward />
        ) : (
          <MdFileDownloadDone />
        )}
      </Button>
    </div>
  );
};

export default CreationPageNavButton;
