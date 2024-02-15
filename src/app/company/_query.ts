import { employeeCard } from '@/fragments/employeeCard';
import { howWeWorkBlock } from '@/fragments/howWeWorkBlock';
import { imgData } from '@/fragments/imgData';
import { pageMetaBlock } from '@/fragments/pageMetaBlock';
import { proposalBlock } from '@/fragments/proposalBlock';
import { testimonialBlock } from '@/fragments/testimonialBlock';
import { serviceExpertiseBlock } from '@/fragments/serviceExpertiseBlock';
import { gql } from '@apollo/client';
import { pageBlock } from '@/fragments/pageBlock';

export const userQuery = gql`
  query {
    aboutUsPage {
      data {
        id
        attributes {
          textBlockFirst
          textBlockSecond
          serviceExpertiseBlock ${serviceExpertiseBlock}
          testimonialsBlock ${testimonialBlock}
          proposalBlockFirst ${proposalBlock}
          proposalBlockSecond ${proposalBlock}
          howWeWorkBlock ${howWeWorkBlock}
          pageMeta ${pageMetaBlock}
          whoWeAreBlock {
            id
            whoWeAreTitle
            whoWeAreDescription
            qualityImproveTitle
            qualityImproveDescription
            images ${imgData}
          }
          joinOurTeamBlock {
            id
            title
            joinButtonText
            img ${imgData}
              page_url {
            data {
              id,
              attributes {
              url
                }
              }
            }
          }
          carouselBlock {
            id
            title
            description
            carousel_cards {
              data {
                id
                attributes {
                  image ${imgData}
                }
              }
            }
          }
          ourValuesBlock {
            id
            title
            our_values_cards {
              data {
                id
                attributes {
                  title
                  description
                  img ${imgData}
                }
              }
            }
          }
          teamBlock {
            id
            title
            employees ${employeeCard}
          }
          ourMissionBlock ${pageBlock}

        }
      }
    }
  }
`;
