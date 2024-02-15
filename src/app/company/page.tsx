import React from 'react';
import { Metadata } from 'next';
import { getClient } from '@/lib/client';
import { userQuery } from './_query';
import { openGraphBase } from '../shared-metadata';
import MainCarousel from '@/components/MainCarousel/MainCarousel';
import ProposalBlock from '@/components/ProposalBlock/ProposalBlock';
import BenefitsSection from '@/components/BenefitsSection/BenefitsSection';
import { ValuesListSection } from '@/components/ValuesListSection/ValuesListSection';
import HowWeWorkSection from '@/components/ServicesPage/HowWeWorkSection/HowWeWorkSection';
import { ColoredTextSection } from '@/components/ColoredTextSection/ColoredTextSection';
import OurClientsSaySection from '@/components/OurClientsSaySection/OurClientsSaySection';
import TeamSection from '@/components/Company/TeamSection/TeamSection';
import ExpertiseServiceSection from '@/components/Company/ExpertiseServiceSection/ExpertiseServiceSection';
import WhoWeAreSection from '@/components/WhoWeAreSection/WhoWeAreSection';
import { OurVisionSection } from '@/components/OurVisionSection/OurVisionSection';

import styles from './page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = (
    await getClient().query({
      query: userQuery,
    })
  )?.data?.aboutUsPage;
  const meta = data?.attributes?.pageMeta;

  return {
    ...(meta?.metaTitle && { title: meta?.metaTitle }),
    ...(meta?.metaDescription && { description: meta?.metaDescription }),
    ...(meta?.metaKeywords && { keywords: meta?.metaKeywords }),
    alternates: {
      canonical: `/${meta?.canonical}`,
    },
    openGraph: {
      ...(meta?.metaTitle && { title: meta?.metaTitle }),
      ...(meta?.metaDescription && { description: meta?.metaDescription }),

      ...openGraphBase,
    },
  };
}

export default async function Company() {
  const { data: company } = (await getClient().query({ query: userQuery })).data
    .aboutUsPage;

  const { proposalBlockFirst, proposalBlockSecond } = company?.attributes;

  return (
    <main className={styles.main}>
      {company?.attributes?.carouselBlock && (
        <MainCarousel carouselBlock={company?.attributes?.carouselBlock} />
      )}
      {company?.attributes?.whoWeAreBlock && (
        <WhoWeAreSection
          whoWeAreBlock={company?.attributes?.whoWeAreBlock}
          className={styles.who_we_are_container}
        />
      )}
      {company?.attributes?.proposalBlockFirst?.title && (
        <OurVisionSection
          title={proposalBlockFirst?.title}
          label={proposalBlockFirst?.blockButton?.text}
          className={styles.proposal_block}
          backgroundPlaceholderUrl={
            proposalBlockFirst?.backgroundImg?.data?.attributes?.placeholder
          }
          backgroundUrl={
            proposalBlockFirst?.backgroundImg?.data?.attributes?.url
          }
        />
      )}
      <BenefitsSection
        className={styles.our_mission_container}
        title={company?.attributes?.ourMissionBlock?.title}
        article={company?.attributes?.ourMissionBlock?.description}
        imgUrl={
          company?.attributes?.ourMissionBlock?.img?.data?.attributes?.url
        }
        imgWrapperClassName={styles.benefits_image_wrapper}
      />
      {company?.attributes?.ourValuesBlock?.our_values_cards?.data && (
        <ValuesListSection
          sectionStyle={styles.values_container}
          title={company?.attributes?.ourValuesBlock?.title}
          cards={company?.attributes?.ourValuesBlock?.our_values_cards?.data}
        />
      )}

      {company?.attributes?.textBlockFirst && (
        <ColoredTextSection
          textClassName={styles.text}
          text={company?.attributes?.textBlockFirst}
        />
      )}

      {company?.attributes?.howWeWorkBlock?.approaches?.data && (
        <HowWeWorkSection
          allowTouch={true}
          showImages={false}
          className={styles.how_we_work_container}
          title={company?.attributes?.howWeWorkBlock?.title}
          description={company?.attributes?.howWeWorkBlock?.description}
          cards={company?.attributes?.howWeWorkBlock?.approaches?.data}
        />
      )}
      <OurClientsSaySection
        testimonials={
          company?.attributes?.testimonialsBlock?.testimonials?.data
        }
        awards={company?.attributes?.testimonialsBlock?.rewards?.data}
        mainTitle={company?.attributes?.testimonialsBlock?.mainTitle}
        subTitle={company?.attributes?.testimonialsBlock?.subTitle}
        alternativeTitle={
          company?.attributes?.testimonialsBlock?.alternativeTitle
        }
        className={styles.testimonials}
      />
      {company?.attributes?.textBlockSecond && (
        <ColoredTextSection
          textClassName={styles.text}
          text={company?.attributes?.textBlockSecond}
        />
      )}
      <TeamSection
        teamBlock={company?.attributes?.teamBlock}
        joinTeamBlock={company?.attributes?.joinOurTeamBlock}
      />
      <ExpertiseServiceSection
        serviceExpertiseBlock={company?.attributes?.serviceExpertiseBlock}
      />

      {company?.attributes?.proposalBlockSecond?.title && (
        <ProposalBlock
          className={styles.second_proposal_block}
          title={proposalBlockSecond?.title}
          buttonData={proposalBlockSecond?.blockButton}
          backgroundImgUrl={
            proposalBlockSecond?.backgroundImg?.data?.attributes?.url
          }
          backgroundPlaceholderUrl={
            proposalBlockSecond?.backgroundImg?.data?.attributes?.placeholder
          }
          mobileBackgroundImgUrl={
            proposalBlockSecond?.mobileBackgroundImg?.data?.attributes?.url
          }
          mobileBackgroundPlaceholderUrl={
            proposalBlockSecond?.mobileBackgroundImg?.data?.attributes
              ?.placeholder
          }
          labelIconUrl={proposalBlockSecond?.labelIcon?.data?.attributes?.url}
          labelIconPlaceholderUrl={
            proposalBlockSecond?.labelIcon?.data?.attributes?.placeholder
          }
          sharedProposalIcons={proposalBlockSecond?.sharedProposalIcons}
        />
      )}
    </main>
  );
}
