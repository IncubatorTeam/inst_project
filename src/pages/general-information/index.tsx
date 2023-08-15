// import React, { ChangeEvent, useState } from 'react';
// import { useSubmitUserDataMutation } from 'src/api/generalApi';
// import ImageModal from '../../components/modul/ImageModal';
// import styles from './styles.module.css';
// import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';

// import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';


// const FormPage = () => {
//   const [name, setName] = useState('');
//   const [firstname, setFirstname] = useState('');
//   const [birthday, setBirthday] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [city, setCity] = useState('');
//   const [aboutme, setAboutme] = useState('');
//   const [image, setImage] = useState<File | null>(null);

//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const [submitUserData, { isLoading }] = useSubmitUserDataMutation();

//   const openModal = () => setModalIsOpen(true);
//   const closeModal = () => setModalIsOpen(false);

//   const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setImage(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = e => {
//         setImagePreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = () => {
//   const formData = new FormData();
//   formData.append('name', name); 
//   formData.append('aboutMe', aboutme);
//   formData.append('birthdayDate', birthday);
//   formData.append('city', city);
//   formData.append('firstName', firstname);
//   formData.append('lastName', lastname);
//   if (image) formData.append('file', image);

//     submitUserData(formData)
//       .unwrap()
//       .then(() => {
//         // Обработка успешного результата
//       })
//       .catch(() => {
//         setErrorMessage('Something went wrong. Please try again.');
//       });
//   };

//   return (
//     <div className={styles.form}>
//       <div className={styles.addPhotoText}>Add photo</div>
//       <label className={styles.inputText}>
//         User name
//         <input className={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
//       </label>
//       <label className={styles.inputText}>
//         First name
//         <input className={styles.input} type="text" value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="First name" />
//       </label>
//       <label className={styles.inputText}>
//         Last Name
//         <input className={styles.input} value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Last Name" />
//       </label>
//       <div className={styles.dateText}>
//         Date of birthday
//         <input className={styles.inputDate} type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Address" />
//       </div>
//       <label className={styles.inputText}>
//         City
//         <input className={styles.input} type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
//       </label>
//       <label className={styles.inputText}>
//         About me
//         <textarea className={styles.textarea} value={aboutme} onChange={e => setAboutme(e.target.value)} placeholder="Description" />
//       </label>
//       <div className={styles.imageUpload} onClick={openModal}>
//         {imagePreview ? (
//           <img src={imagePreview} alt="Profile" className={styles.profilePreview} />
//         ) : (
//           <img src="/assets/image.png" alt="Click to add photo" className={styles.placeholderImage} />
//         )}
//       </div>

//       {modalIsOpen && (
//         <div className={styles.modal}>
//           <ImageModal onImageChange={onImageChange} closeModal={closeModal} imagePreview={imagePreview} />
//         </div>
//       )}

//       <div className={styles.lineAndButtonContainer}>
//         <div className={styles.line}></div>
//         <button className={styles.button} onClick={handleSubmit} disabled={isLoading}>

//           {isLoading ? 'Submitting...' : 'Submit'}

//         </button>
//       </div>

//       {errorMessage && <div className={styles.error}>{errorMessage}</div>}

//     </div>
//   );
// }

// FormPage.getLayout = getLayout
// export default FormPage;





import React, { ChangeEvent, useState } from 'react';
import { useSubmitUserDataMutation } from 'src/api/generalApi';
import ImageModal from '../../components/modul/ImageModal';
import styles from './styles.module.css';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


const FormPage = () => {

  // const token = Cookies.get('token');
  // const isAuth = Boolean(token); // Проверка, есть ли токен

  // if (!isAuth) {
  //   router.push('/login'); // Перенаправление на страницу входа
  //   return null; // Возвращаем null, чтобы ничего не отображать, пока не произойдет перенаправление
  // }

  const router = useRouter(); // Вот тут объявление router

  const token = Cookies.get('token');
  const isAuth = Boolean(token); // Проверка, есть ли токен

  if (!isAuth) {
    router.push('/login'); // Перенаправление на страницу входа
    return null; // Возвращаем null, чтобы ничего не отображать, пока не произойдет перенаправление
  }


  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [aboutme, setAboutme] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [submitUserData, { isLoading }] = useSubmitUserDataMutation();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
  const formData = new FormData();
  formData.append('name', name); 
  formData.append('aboutMe', aboutme);
  formData.append('birthdayDate', birthday);
  formData.append('city', city);
  formData.append('firstName', firstname);
  formData.append('lastName', lastname);
  if (image) formData.append('file', image);

    submitUserData(formData)
      .unwrap()
      .then(() => {
        // Обработка успешного результата
      })
      .catch(() => {
        setErrorMessage('Something went wrong. Please try again.');
      });
  };

  return (
    // <div className={styles.form}>
    //   <div className={styles.addPhotoText}>Add photo</div>
    //   <label className={styles.inputText}>
    //     User name
    //     <input className={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
    //   </label>
    //   <label className={styles.inputText}>
    //     First name
    //     <input className={styles.input} type="text" value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="First name" />
    //   </label>
    //   <label className={styles.inputText}>
    //     Last Name
    //     <input className={styles.input} value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Last Name" />
    //   </label>
    //   <div className={styles.dateText}>
    //     Date of birthday
    //     <input className={styles.inputDate} type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Address" />
    //   </div>
    //   <label className={styles.inputText}>
    //     City
    //     <input className={styles.input} type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
    //   </label>
    //   <label className={styles.inputText}>
    //     About me
    //     <textarea className={styles.textarea} value={aboutme} onChange={e => setAboutme(e.target.value)} placeholder="Description" />
    //   </label>
    //   <div className={styles.imageUpload} onClick={openModal}>
    //     {imagePreview ? (
    //       <img src={imagePreview} alt="Profile" className={styles.profilePreview} />
    //     ) : (
    //       <img src="/assets/image.png" alt="Click to add photo" className={styles.placeholderImage} />
    //     )}
    //   </div>

    //   {modalIsOpen && (
    //     <div className={styles.modal}>
    //       <ImageModal onImageChange={onImageChange} closeModal={closeModal} imagePreview={imagePreview} />
    //     </div>
    //   )}

    //   <div className={styles.lineAndButtonContainer}>
    //     <div className={styles.line}></div>
    //     <button className={styles.button} onClick={handleSubmit} disabled={isLoading}>

    //       {isLoading ? 'Submitting...' : 'Submit'}

    //     </button>
    //   </div>

    //   {errorMessage && <div className={styles.error}>{errorMessage}</div>}

    // </div>



    <div className={styles.form}>
  {isAuth ? ( // Проверка токена
    <>
      <div className={styles.addPhotoText}>Add photo</div>
      <label className={styles.inputText}>
        User name
        <input className={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      </label>
      <label className={styles.inputText}>
        First name
        <input className={styles.input} type="text" value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="First name" />
      </label>
      <label className={styles.inputText}>
        Last Name
        <input className={styles.input} value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Last Name" />
      </label>
      <div className={styles.dateText}>
        Date of birthday
        <input className={styles.inputDate} type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Address" />
      </div>
      <label className={styles.inputText}>
        City
        <input className={styles.input} type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
      </label>
      <label className={styles.inputText}>
        About me
        <textarea className={styles.textarea} value={aboutme} onChange={e => setAboutme(e.target.value)} placeholder="Description" />
      </label>
      <div className={styles.imageUpload} onClick={openModal}>
        {imagePreview ? (
          <img src={imagePreview} alt="Profile" className={styles.profilePreview} />
        ) : (
          <img src="/assets/image.png" alt="Click to add photo" className={styles.placeholderImage} />
        )}
      </div>

      {modalIsOpen && (
        <div className={styles.modal}>
          <ImageModal onImageChange={onImageChange} closeModal={closeModal} imagePreview={imagePreview} />
        </div>
      )}

      <div className={styles.lineAndButtonContainer}>
        <div className={styles.line}></div>
        <button className={styles.button} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </>
  ) : (
    <div>Invalid token or token has expired</div> // Сообщение об ошибке, если токен недействителен или отсутствует
  )}
</div>

  );
}

FormPage.getLayout = getLayout
export default FormPage;
