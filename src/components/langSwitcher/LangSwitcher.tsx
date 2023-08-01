import Select from '@/shared/ui/select/Select';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

export const LangSwitcher = () => {
  const { locale, push, pathname, query, asPath, locales } = useRouter();

  type languagesType = {
      [language:string] : string
  }
  const languages:languagesType ={
      'русский': 'ru',
      'english': 'en'
  }
  const changeLangHandler = (item: string) => {
    //const locale = event.currentTarget.value;
    push({ pathname, query }, asPath, { locale: languages[item]});
  };

  return (
    <Select
      items={[
        { title: 'Русский', icon: '' },
        { title: 'English', icon: '' },
      ]}
      onValueChange={changeLangHandler}
    />
  );
};