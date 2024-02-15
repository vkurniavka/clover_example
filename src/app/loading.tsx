import { PageLoader } from '@/components/UIElements/PageLoader/PageLoader';

export default function Loading() {
  return (
    <div
      style={{
        maxWidth: '1410px',
        margin: '0 auto',
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PageLoader />
    </div>
  );
}
