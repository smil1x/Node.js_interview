import React, { useEffect, useState } from 'react';
import styles from './CreateGroup.module.scss';
import { Button, Dropdown, Popup, TextInput } from '../shared';
import { useFormHook } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import yup from '../../utils/yup.utils';
import { listRoles } from '../../utils/IAM.utils';
import { createGroup } from '../../utils';

const schema = yup.object().shape({
  groupName: yup.string().max(128, 'must be at most 128 characters').required(),
  description: yup.string(),
  IAMRole: yup.string(),
  precedence: yup.string().groupPrecedence(),
});

const CreateGroup = ({ redirectUrl }: {redirectUrl: string}) => {
  const navigate = useNavigate();

  const { formState, updateForm, isValid } = useFormHook(
    {
      groupName: '',
      description: '',
      IAMRole: '',
      precedence: '',
    },
    schema,
  );

  const [IAMRoles, setIAMRoles] = useState([]);

  useEffect(() => {
    listRoles().then((data) => {
      const roles = data.map(({ RoleName, Arn }: any) => {
        return { label: RoleName, value: Arn };
      });
      setIAMRoles(roles);
    });
  }, []);

  const handleSubmit = async () => {
    const isFormValid = await isValid();
    if (isFormValid) {
      createGroup({
        GroupName: formState.groupName,
        Description: formState.description,
        RoleArn: formState.IAMRole,
        Precedence: Number(formState.precedence)
      }).then(() => {
        redirect();
      })
    }
  };

  const redirect = () => {
    navigate(redirectUrl || '/');
  };

  return (
    <Popup close={redirect}>
      <div className={styles.container}>
        <p className='formName'>Create Group</p>
        <TextInput
          value={formState.groupName}
          placeholder={'Name'}
          onChange={(value: any) => {
            updateForm('groupName', value);
          }}
          info={formState.error.path === 'groupName' ? formState.error : { messages: ['Required'], level: 'info' }}
        />
        <TextInput
          value={formState.description}
          placeholder={'Description'}
          onChange={(value: any) => {
            updateForm('description', value);
          }}
          info={formState.error.path === 'description' ? formState.error : {}}
        />
        <div className={styles.IAMRole}>
          <Dropdown
            options={IAMRoles}
            placeholder='IAM role'
            onChange={(value: any) => {
              updateForm('IAMRole', value);
            }}
            selectedValue={Array(IAMRoles.find((item) => item.value === formState.IAMRole))}
            movePlaceholder={true}
          />
        </div>
        <em>Create role</em>
        <TextInput
          value={formState.precedence}
          placeholder={'Precedence'}
          onChange={(value: any) => {
            updateForm('precedence', value);
          }}
          info={formState.error.path === 'precedence' ? formState.error : {}}
        />
        <span>
          Precedence can be used to select which group is applied for permissions if a user is in multiple groups. The
          group with the lowest precedence is applied.<br />
          <a
            href='https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html'
            target='_blank' rel='noreferrer'
          >
            <em>Learn more about precedence</em>
          </a>
        </span>
        <Button onClick={handleSubmit} color={'primary'}>
          Create Group
        </Button>
      </div>
    </Popup>
  );
};

export default CreateGroup;
