import React from 'react';
import Image from 'next/image';
import AnimateButtonLink from '@/components/UIElements/AnimateButtonLink/AnimateButtonLink';
import ArrowRightIcon from '@/components/UIElements/Icons/ArrowRightIcon';
import { IJoinOurTeamBlock, ITeamBlock } from '@/interfaces/company.interface';
import joinTeamBackground from '../../../../public/images/main_page_hero_bg.png';
import { ButtonLinkVariants } from '@/enums/buttonLink.enum';

import styles from './TeamSection.module.css';

interface Props {
  teamBlock: ITeamBlock;
  joinTeamBlock: IJoinOurTeamBlock;
}

const TeamSection = (props: Props): React.JSX.Element => {
  const { teamBlock, joinTeamBlock } = props;

  return (
    <section className={styles.container}>
      {teamBlock && (
        <div className={styles.team_block}>
          <h2 className={styles.team_title}>{teamBlock?.title}</h2>
          <ul className={styles.team_container}>
            {teamBlock?.employees?.data?.map(profile => (
              <li key={profile.id} className={styles.profile}>
                <div className={styles.profile_img_wrapper}>
                  <Image
                    className={styles.profile_image}
                    src={profile?.attributes?.img?.data?.attributes?.url}
                    alt={profile?.attributes?.name}
                    sizes={'25vw'}
                    fill
                    placeholder={
                      profile?.attributes?.img?.data?.attributes?.placeholder
                        ? 'blur'
                        : 'empty'
                    }
                    blurDataURL={
                      profile?.attributes?.img?.data?.attributes?.placeholder
                    }
                  />
                </div>
                <div className={styles.profile_information}>
                  <div className={styles.name}>{profile.attributes?.name}</div>
                  <div className={styles.position}>
                    {profile?.attributes?.position}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {joinTeamBlock && (
        <div className={styles.join_team_container}>
          <div className={styles.work_space_image_wrapper}>
            <Image
              className={styles.work_space_image}
              src={joinTeamBlock?.img?.data?.attributes?.url}
              fill
              alt={joinTeamBlock?.title}
              placeholder={
                joinTeamBlock?.img?.data?.attributes?.placeholder
                  ? 'blur'
                  : 'empty'
              }
              blurDataURL={joinTeamBlock?.img?.data?.attributes?.placeholder}
            />
          </div>
          <div className={styles.join_team_block}>
            <Image
              src={joinTeamBackground}
              alt={'Join team background image'}
              fill
              sizes={'(max-width: 570px) 100vw, 0vw'}
              className={styles.join_team_back_image}
            />
            <div className={styles.join_team_box}>
              <div className={styles.join_team_title}>
                {joinTeamBlock?.title}
              </div>
              <div>
                <AnimateButtonLink
                  href={`/${joinTeamBlock?.page_url?.data?.attributes?.url}?type=candidate`}
                  variant={ButtonLinkVariants.CLEAR_OUTLINED}
                  ariaLabel={joinTeamBlock?.joinButtonText}
                  className={styles.apply_button}
                  icon={<ArrowRightIcon />}
                >
                  {joinTeamBlock?.joinButtonText}
                </AnimateButtonLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamSection;
