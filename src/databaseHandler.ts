import { openDB } from 'idb';
import { Apartment } from './apartment';

const DATABASE = 'Apartment';
const TABLE = 'table_apartment';

async function initDB() {
  const db = await openDB(DATABASE, 1, {
    upgrade(db) {
      const store = db.createObjectStore(TABLE, {
        keyPath: 'id',
        autoIncrement: true,
      }); 
    }
  });
};

initDB().then(() => {
  console.log('Database is ready');
});

export async function insertApartment(apartment: any) {
  const db = await openDB(DATABASE, 1);

  await db.put(TABLE, apartment)
    .then(() => {
      console.log('You have succesfully created 1 apartment: ', apartment);
    })
    .catch((err) => {
      console.log('You have an error occurred');
      console.log(err);
    });
};

export async function updateApartment(dataUpdate: any, id: number) {
  const db = await openDB(DATABASE, 1);

  const apartment = await db.transaction(TABLE).objectStore(TABLE).get(id) as Apartment;

  apartment.propertyType = dataUpdate.propertyType;
  apartment.bedrooms = dataUpdate.bedrooms;
  apartment.dateTimeAdding = dataUpdate.dateTimeAdding;
  apartment.monthlyRentPrice = dataUpdate.monthlyRentPrice;
  apartment.furnitureTypes = dataUpdate.furnitureTypes;
  apartment.notes = dataUpdate.notes;
  apartment.nameReporter = dataUpdate.nameReporter;

  await db.put(TABLE, apartment)
    .then(() => {
      console.log(`You have successfully updated information for apartment: ${id}`);
      console.log(apartment);
    })
    .catch((err) => {
      console.log('You have an error occurred');
      console.log(err);
    });
};

export async function deleteApartment(id: number) {
  const db = await openDB(DATABASE, 1);

  await db.delete(TABLE, id)
    .then(() => {
      console.log(`You have successfully deleted the apartment: ${id}`);
    })
    .catch((err) => {
      console.log('You have an error occurred');
      console.log(err);
    });
};

export async function getApartmentById(id: number) {
  const db = await openDB(DATABASE, 1);
  const apartment = await db.transaction(TABLE).objectStore(TABLE).get(id);

  return apartment;
}

export async function getAllApartment() {
  const db = await openDB(DATABASE, 1);

  let apartment = await db.transaction(TABLE).objectStore(TABLE).openCursor();

  let allApartment = [];

  while (apartment) {
    allApartment.push(apartment.value);

    apartment = await apartment.continue();
  };

  return allApartment;
};