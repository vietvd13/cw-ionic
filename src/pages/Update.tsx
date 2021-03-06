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
  useIonViewDidEnter,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { add } from 'ionicons/icons';
import { 
  getApartmentById, 
  updateApartment 
} from '../databaseHandler';
import { Apartment } from '../apartment';
import {
  convertDate,
  validateForm,
  createMessageError,
  showFurnitureTypes,
} from '../utils/hepler';
import { RouteComponentProps } from "react-router-dom";

interface DetailProps 
  extends RouteComponentProps<{
    id: string
  }> {};

const Update: React.FC<DetailProps> = ({ match }) => {
  // Property type
  const [idApartment, setIdApartment] = useState('');
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
  const [isProcess, setIsProcess] = useState(false);

  async function fetchData() {
    setIsProcess(true);

    const apartment = await getApartmentById(Number.parseInt(match.params.id)) as Apartment;

    setPropertyType(apartment.propertyType);
    setBedrooms(apartment.bedrooms);
    setDateTimeAdding(apartment.dateTimeAdding);
    setMonthlyRentPrice(apartment.monthlyRentPrice);
    setFurnitureTypes(apartment.furnitureTypes);
    setNotes(apartment.notes);
    setNameReporter(apartment.nameReporter);

    setIsProcess(false);
  };

  useIonViewDidEnter(async() => {
    await setIdApartment(match.params.id);
    
    await fetchData();
  }, [match.params.id]);

  /**
   * Function handle Submit Form
   */
   const handleSubmit = async() => {
    setIsProcess(true);

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
          <h6>Do you want to update the information of this apartment?</h6>
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
              await updateApartment(Form, parseInt(idApartment));

              setHeaderMessage('Success');
              setMessage(`You have successfully updated the information of the apartment with ID ${idApartment}`);
              setColorMessage('success');
              setShowToast(true);
              history.push('/home');
              
              setTimeout(()=>{
                setShowToast(false);
              }, 5000);
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

    setIsProcess(false);
  };

  return (
    <IonPage>

      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Update an apartment</IonTitle>
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
                disabled={isProcess}
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
                value={bedrooms}
                onIonChange={event => setBedrooms(event.detail.value!)}
                placeholder="Input number bedrooms"
                disabled={isProcess}
              ></IonInput>
            </IonCol>
          </IonRow>

          {/* Date and time of adding the Property */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Date and time of adding the Property</IonLabel>
              <IonDatetime
                value={dateTimeAdding}
                onIonChange={event => setDateTimeAdding(event.detail.value!)} 
                display-format="YYYY/MM/DD" 
                placeholder="Input date time of adding the property"
                disabled={isProcess}
              ></IonDatetime>
            </IonCol>
          </IonRow>

          {/* Monthly rent price */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Monthly rent price</IonLabel>
              <IonInput
                value={monthlyRentPrice}
                onIonChange={event => setMonthlyRentPrice(event.detail.value!)} 
                placeholder="Input monthly rent price"
                disabled={isProcess}
              ></IonInput>
            </IonCol>
          </IonRow>

          {/* Furniture types */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Furniture types</IonLabel>
              <IonRadioGroup value={furnitureTypes} onIonChange={event => setFurnitureTypes(event.detail.value)} style={{ marginTop: '10px' }}>
              <IonItem>
                <IonLabel><small>Furnished</small></IonLabel>
                <IonRadio 
                  slot="start" 
                  value="Furnished"
                  disabled={isProcess}
                ></IonRadio>
              </IonItem>
              <IonItem>
                <IonLabel><small>Unfurnished</small></IonLabel>
                <IonRadio 
                  slot="start" 
                  value="Unfurnished"
                  disabled={isProcess}
                ></IonRadio>
              </IonItem>
              <IonItem>
                <IonLabel><small>Part Furnished</small></IonLabel>
                <IonRadio 
                  slot="start" 
                  value="PartFurnished"
                  disabled={isProcess}
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
                value={notes}
                onIonChange={event => setNotes(event.detail.value!)}
                placeholder="Input Notes"
                disabled={isProcess}
              ></IonTextarea>
            </IonCol>
          </IonRow>

          {/* Name of the reporter */}
          <IonRow>
            <IonCol>
              <IonLabel position="stacked">Name of the reporter</IonLabel>
              <IonInput
                value={nameReporter}
                onIonChange={event => setNameReporter(event.detail.value!)} 
                placeholder="Input name reporter"
                disabled={isProcess}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleSubmit} disabled={isProcess}>
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

export default Update;
