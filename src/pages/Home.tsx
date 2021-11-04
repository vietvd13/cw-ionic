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
} from '@ionic/react';
import '../style/Home.css';
import { addCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getAllApartment, deleteApartment } from '../databaseHandler';
import { Apartment } from '../apartment';

const Home: React.FC = () => {
  const [listApartment, setListApartment] = useState<Apartment[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [keySearch, setKeySearch] = useState('');

  async function fetchData() {
    const allApartment = await getAllApartment();

    setListApartment(allApartment);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id: number) {
    const userConfirm = window.confirm("Are you sure to delete?");

    if (userConfirm) {
      await deleteApartment(id);
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      }, 5000);
      await fetchData();
    };
  }

  async function handleSearch(event: any) {
    setKeySearch(event.detail.value);

    let allApartment = await getAllApartment();

    if (event.detail.value) {
      const re = new RegExp(`[${event.detail.value}]`);
      let res = [];
      for (let item = 0; item < allApartment.length; item++) {
        if (re.test(allApartment[item]['nameReporter'])) {
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
                  <h6>Furniture Types: { apartment.furnitureTypes }</h6>
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

      <IonToast isOpen={showToast} header="Success" message="You have successfully deleted" color="success" position="top"></IonToast>

    </IonPage>
  );
};

export default Home;