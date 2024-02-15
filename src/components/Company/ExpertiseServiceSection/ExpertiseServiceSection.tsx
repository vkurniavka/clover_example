import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowRightIcon from '@/components/UIElements/Icons/ArrowRightIcon';
import { IServiceExpertiseBlock } from '@/interfaces/company.interface';

import styles from './ExpertiseServiceSection.module.css';
interface Props {
  serviceExpertiseBlock: IServiceExpertiseBlock;
}

const ExpertiseServiceSection = ({
  serviceExpertiseBlock,
}: Props): React.JSX.Element => {
  const {
    serviceImage,
    expertiseImage,
    expertiseTitle,
    serviceTitle,
    expertiseLink,
    serviceLink,
  } = serviceExpertiseBlock;
  return (
    <section className={styles.container}>
      <Link href={`/${expertiseLink}`} className={styles.expertise_box}>
        <div className={styles.block}>
          <h2 className={styles.title}>{expertiseTitle}</h2>
          <ArrowRightIcon className={styles.icon} />
        </div>
        <div className={styles.image_wrapper}>
          <Image
            src={expertiseImage?.data?.attributes?.url}
            width={expertiseImage?.data?.attributes?.width}
            height={expertiseImage?.data?.attributes?.height}
            alt={`Illustration of '${expertiseTitle}'`}
            className={styles.image}
            priority
            placeholder={
              expertiseImage.data?.attributes?.placeholder ? 'blur' : 'empty'
            }
            blurDataURL={expertiseImage?.data?.attributes?.placeholder}
          />
        </div>
      </Link>
      <Link href={`/${serviceLink}`} className={styles.service_box}>
        <div className={styles.block}>
          <h2 className={styles.title}>{serviceTitle}</h2>
          <ArrowRightIcon className={styles.icon} />
        </div>
        <div className={styles.image_wrapper}>
          <Image
            src={serviceImage?.data?.attributes?.url}
            width={expertiseImage?.data?.attributes?.width}
            height={expertiseImage?.data?.attributes?.height}
            alt={`Illustration of '${serviceTitle}'`}
            className={styles.image}
          />
        </div>
      </Link>
    </section>
  );
};

export default ExpertiseServiceSection;
