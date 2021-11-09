import { 
  IonPage, 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, 
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonToast,
  IonInput,
  useIonAlert,
  useIonViewDidEnter,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import '../style/Home.css';
import { addCircle } from 'ionicons/icons';
import { useState } from 'react';
import { 
  getAllApartment, 
  deleteApartment 
} from '../databaseHandler';
import { Apartment } from '../apartment';
import {
  showFurnitureTypes
} from '../utils/hepler';

const Home: React.FC = () => {
  const [listApartment, setListApartment] = useState<Apartment[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [searchType, setSearchType] = useState('propertyType');
  const [keySearch, setKeySearch] = useState('');
  const [message, setMessage] = useState('');
  const [present] = useIonAlert();

  async function fetchData() {
    let allApartment = await getAllApartment();

    allApartment.reverse();

    setListApartment(allApartment);
  };

  useIonViewDidEnter(() => {
    fetchData();
  });

  async function handleDelete(id: number) {

    present({
      header: 'Confirm',
      message: `Do you want to delete the apartment whose ID is ${id}?`,
      buttons: [
        'Cancel',
        { 
          text: 'Ok', 
          handler: async() => {
            await deleteApartment(id);

            setMessage(`You have successfully deleted the apartment with ID ${id}`);
            setShowToast(true);

            setTimeout(()=>{
              setShowToast(false);
            }, 5000);

            await fetchData();
          } 
        },
      ],
    });
  }

  async function handleSearch(event: any) {
    setKeySearch(event.detail.value);

    let allApartment = await getAllApartment();

    if (event.detail.value) {
      const re = new RegExp(`${event.detail.value}.*`);
      let res = [];
      for (let item = 0; item < allApartment.length; item++) {
        if (re.test(allApartment[item][searchType])) {
          res.push(allApartment[item])
        }
      }
  
      setListApartment(res);
    } else {
      setListApartment(allApartment);
    }
  }

  return (
    <IonPage>

      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rental Apartments Finder</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Content */}
      <IonContent fullscreen>
        <IonGrid>

          <IonRow>
            <IonCol>
              <IonButton size="small" color="primary" href="/create" expand="block">
                <IonIcon slot="start" icon={addCircle}></IonIcon>
                Create new
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel>Search Type</IonLabel>
              <IonSelect value={searchType} placeholder="Select One" onIonChange={e => setSearchType(e.detail.value)}>
                <IonSelectOption value="id">ID</IonSelectOption>
                <IonSelectOption value="propertyType">Property Type</IonSelectOption>
                <IonSelectOption value="bedrooms">Beadrooms</IonSelectOption>
                <IonSelectOption value="dateTimeAdding">Date Time Adding</IonSelectOption>
                <IonSelectOption value="monthlyRentPrice">Monthly Rent Price</IonSelectOption>
                <IonSelectOption value="furnitureTypes">Furniture Types</IonSelectOption>
                <IonSelectOption value="notes">Notes</IonSelectOption>
                <IonSelectOption value="nameReporter">Name Reporter</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonInput value={keySearch} placeholder="Search" onIonChange={event => handleSearch(event)}></IonInput>
            </IonCol>
          </IonRow>

          {listApartment &&
            listApartment.map((apartment, index) => 
              <IonCard key={index}>
                <IonCardHeader>Aparment ID: #{ apartment.id }</IonCardHeader>
                <IonCardContent>
                  <h6>Property Type: { apartment.propertyType }</h6>
                  <h6>Bed Rooms: { apartment.bedrooms }</h6>
                  <h6>Date Time Adding: { apartment.dateTimeAdding }</h6>
                  <h6>Monthly Rent Price: { apartment.monthlyRentPrice}</h6>
                  <h6>Furniture Types: { showFurnitureTypes(apartment.furnitureTypes) }</h6>
                  <h6>Notes: { apartment.notes }</h6>
                  <h6>Name Reporter: { apartment.nameReporter }</h6>

                  <IonRow>
                    <IonCol>
                      <IonButton 
                        size="small" 
                        color="warning" 
                        className="btn-handle" 
                        style={{ float: 'left' }}
                        routerLink={`detail/${apartment.id}`}
                      >Update</IonButton>
                    </IonCol>

                    <IonCol>
                      <IonButton 
                        size="small" 
                        color="danger" 
                        className="btn-handle" 
                        style={{ float: 'right' }}
                        onClick={() => handleDelete(apartment.id || -1)}
                      >Delete</IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            )
          }

        </IonGrid>
      </IonContent>

      <IonToast isOpen={showToast} header="Success" message={message} color="success" position="top"></IonToast>

    </IonPage>
  );
};

export default Home;
