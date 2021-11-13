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
  useIonAlert,
  useIonViewDidEnter,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
} from '@ionic/react';
import '../style/Home.css';
import { addCircle, home, create, trash } from 'ionicons/icons';
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
  const [isProcess, setIsProcess] = useState(false);

  async function fetchData() {
    setIsProcess(true);

    let allApartment = await getAllApartment();

    allApartment.reverse();

    setListApartment(allApartment);

    setIsProcess(false);
  };

  useIonViewDidEnter(() => {
    fetchData();
  });

  async function handleDelete(id: number) {
    setIsProcess(true);

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

    setIsProcess(false);
  }

  async function handleSearch(event: any) {
    setIsProcess(true);

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

    setIsProcess(false);
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
              <IonButton color="primary" href="/create" expand="block">
                <IonIcon slot="start" icon={addCircle}></IonIcon>
                Create new
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonSelect value={searchType} placeholder="Search Type" onIonChange={e => setSearchType(e.detail.value)} disabled={isProcess}>
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
              <IonSearchbar value={keySearch} placeholder="Search" onIonChange={event => handleSearch(event)}></IonSearchbar>
            </IonCol>
          </IonRow>

          { listApartment.length === 0 ? 
            <IonRow>
              <IonCol style={{ textAlign: 'center' }}>No Data</IonCol>
            </IonRow>
            : '' 
          }

          {listApartment &&
            listApartment.map((apartment, index) => 
              <IonCard key={index}>
                <IonCardHeader style={{ fontWeight: '600', fontSize: '17px', color: '#fff', backgroundColor: '#4caf50', marginBottom: '10px', padding: '5px 0 5px 16px' }}>
                  <IonIcon icon={home} style={{ marginRight: '5px' }}></IonIcon>
                  Aparment ID: #{ apartment.id }
                </IonCardHeader>
                <IonCardContent>
                  <IonRow>
                    <IonCol size="6" style={{ fontWeight: '600' }}>Property Type:</IonCol>
                    <IonCol size="6">{ apartment.propertyType }</IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6" style={{ fontWeight: '600' }}>Bed Rooms:</IonCol>
                    <IonCol size="6">{ apartment.bedrooms }</IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6" style={{ fontWeight: '600' }}>Date Time Adding:</IonCol>
                    <IonCol size="6">{ apartment.dateTimeAdding }</IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6" style={{ fontWeight: '600' }}>Monthly Rent Price:</IonCol>
                    <IonCol size="6">{ apartment.monthlyRentPrice } USD</IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6" style={{ fontWeight: '600' }}>Furniture Types:</IonCol>
                    <IonCol size="6">{ showFurnitureTypes(apartment.furnitureTypes) }</IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6" style={{ fontWeight: '600' }}>Notes:</IonCol>
                    <IonCol size="6">{ apartment.notes }</IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6" style={{ fontWeight: '600' }}>Name Reporter:</IonCol>
                    <IonCol size="6">{ apartment.nameReporter }</IonCol>
                  </IonRow>

                  <IonRow style={{ marginTop: '10px' }}>
                    <IonCol>
                      <IonButton 
                        size="small" 
                        color="warning" 
                        className="btn-handle" 
                        style={{ float: 'left' }}
                        routerLink={`detail/${apartment.id}`}
                        disabled={isProcess}
                      >
                        <IonIcon icon={create} style={{ marginRight: '5px' }}></IonIcon>
                        Update
                      </IonButton>
                    </IonCol>

                    <IonCol>
                      <IonButton 
                        size="small" 
                        color="danger" 
                        className="btn-handle" 
                        style={{ float: 'right' }}
                        onClick={() => handleDelete(apartment.id || -1)}
                        disabled={isProcess}
                      >
                        <IonIcon icon={trash} style={{ marginRight: '5px' }}></IonIcon>
                        Delete
                      </IonButton>
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
