import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonDatetime,
  IonRadioGroup,
  IonRadio,
  IonTextarea,
  IonButton,
  IonIcon,
  IonToast,
  useIonAlert,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { add } from 'ionicons/icons';
import { insertApartment } from '../databaseHandler';
import {
  convertDate,
  validateForm,
  createMessageError,
  showFurnitureTypes,
} from '../utils/hepler';

const Create: React.FC = () => {
  // Property type
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [dateTimeAdding, setDateTimeAdding] = useState('');
  const [monthlyRentPrice, setMonthlyRentPrice] = useState('');
  const [furnitureTypes, setFurnitureTypes] = useState('');
  const [notes, setNotes] = useState('');
  const [nameReporter, setNameReporter] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [headerMessage, setHeaderMessage] = useState('');
  const [message, setMessage] = useState('');
  const [colorMessage, setColorMessage] = useState('');
  const history = useHistory();
  const [present] = useIonAlert();

  /**
   * Function handle Submit Form
   */
   const handleSubmit = async() => {
    const Form = {
      propertyType,
      bedrooms,
      dateTimeAdding: convertDate(dateTimeAdding),
      monthlyRentPrice,
      furnitureTypes,
      notes,
      nameReporter,
    };

    const isValidate: any = validateForm(Form);
    if (isValidate.length === 0) {
      present({
        header: 'Confirm',
        message: `
          <h6>Are you sure you want to create this apartment?</h6>
          <div>Property Type: ${Form.propertyType}</div>
          <div>Bedrooms: ${Form.bedrooms}</div>
          <div>Date Time Adding: ${Form.dateTimeAdding}</div>
          <div>Monthly Rent Price: ${Form.monthlyRentPrice}</div>
          <div>Furniture Types: ${showFurnitureTypes(Form.furnitureTypes)}</div>
          <div>Notes: ${Form.notes}</div>
          <div>Name Reporter: ${Form.nameReporter}</div>
        `,
        buttons: [
          'Cancel',
          { 
            text: 'Ok', 
            handler: async() => {
              await insertApartment(Form);

              setHeaderMessage('Success');
              setMessage('You have successfully created a new apartment.');
              setColorMessage('success');
              setShowToast(true);
              history.push('/home');
        
              setTimeout(()=>{
                setShowToast(false);
              }, 5000)
            } 
          },
        ],
      });
    } else {
      setHeaderMessage('Warning');
      setMessage(createMessageError(isValidate));
      setColorMessage('warning');
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false);
      }, 5000)
    }
  };

  return (
    <IonPage>

      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create an apartment</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Content */}
      <IonContent fullscreen>
        <IonGrid>

          {/* Select Property type */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Property type</IonLabel>
              <IonSelect
                value={propertyType}
                onIonChange={event => setPropertyType(event.detail.value)}
                placeholder="Please select"
              >
                <IonSelectOption value="Flat">Flat</IonSelectOption>
                <IonSelectOption value="House">House</IonSelectOption>
                <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>

          {/* Number Bedrooms */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Bedrooms</IonLabel>
              <IonInput
                onIonChange={event => setBedrooms(event.detail.value!)}
                placeholder="Input number bedrooms"
              ></IonInput>
            </IonCol>
          </IonRow>

          {/* Date and time of adding the Property */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Date and time of adding the Property</IonLabel>
              <IonDatetime
                onIonChange={event => setDateTimeAdding(event.detail.value!)} 
                display-format="YYYY/MM/DD" 
                placeholder="Input date time of adding the property"
              ></IonDatetime>
            </IonCol>
          </IonRow>

          {/* Monthly rent price */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Monthly rent price</IonLabel>
              <IonInput
                onIonChange={event => setMonthlyRentPrice(event.detail.value!)} 
                placeholder="Input monthly rent price"
              ></IonInput>
            </IonCol>
          </IonRow>

          {/* Furniture types */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Furniture types</IonLabel>
              <IonRadioGroup onIonChange={event => setFurnitureTypes(event.detail.value)} style={{ marginTop: '10px' }}>
              <IonItem>
                <IonLabel><small>Furnished</small></IonLabel>
                <IonRadio 
                  slot="start" 
                  value="Furnished"
                ></IonRadio>
              </IonItem>
              <IonItem>
                <IonLabel><small>Unfurnished</small></IonLabel>
                <IonRadio 
                  slot="start" 
                  value="Unfurnished"
                ></IonRadio>
              </IonItem>
              <IonItem>
                <IonLabel><small>Part Furnished</small></IonLabel>
                <IonRadio 
                  slot="start" 
                  value="PartFurnished"
                ></IonRadio>
              </IonItem>
            </IonRadioGroup>
            </IonCol>
          </IonRow>

          {/* Notes */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Notes</IonLabel>
              <IonTextarea
                onIonChange={event => setNotes(event.detail.value!)}
                placeholder="Input Notes"
              ></IonTextarea>
            </IonCol>
          </IonRow>

          {/* Name of the reporter */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Name of the reporter</IonLabel>
              <IonInput
                onIonChange={event => setNameReporter(event.detail.value!)} 
                placeholder="Input name reporter"
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton size="small" expand="block" onClick={handleSubmit}>
                  <IonIcon 
                    slot="icon-only" 
                    icon={add}
                  ></IonIcon>
                  Submit
              </IonButton>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonContent>

      {/* Start Toast */}
      <IonToast isOpen={showToast} header={headerMessage} message={message} color={colorMessage} position="top"></IonToast>
      {/* End Toast */}

    </IonPage>
  );
};

export default Create;
