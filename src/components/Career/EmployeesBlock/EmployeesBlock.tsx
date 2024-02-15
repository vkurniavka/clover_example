import React from 'react';
import { IEmployeesResponse } from '@/interfaces/career.interface';
import Image from 'next/image';

import styles from './EmployeesBlock.module.css';
interface Props {
  employees: IEmployeesResponse;
}

const EmployeesBlock = (props: Props): React.JSX.Element => {
  const { employees } = props;

  return (
    <div className={styles.container}>
      <div className={styles.profile_list}>
        {employees?.data?.map(employee => (
          <div className={styles.profile_box} key={employee.id}>
            <div className={styles.img_profile_wrapper}>
              <Image
                src={employee?.attributes?.img?.data?.attributes?.url}
                alt={employee?.attributes?.name}
                fill
                className={styles.profile_image}
                placeholder={
                  employee?.attributes?.img?.data?.attributes?.placeholder
                    ? 'blur'
                    : 'empty'
                }
                blurDataURL={
                  employee?.attributes?.img?.data?.attributes?.placeholder
                }
              />
            </div>
            <div className={styles.profile_info}>
              <h3 className={styles.profile_name}>
                {employee?.attributes?.name}
              </h3>
              <p className={styles.profile_position}>
                {employee?.attributes?.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesBlock;
