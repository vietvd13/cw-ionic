
function convertDate(date: string) {
  if (!date) {
    return '';
  }

  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1);
  const day = newDate.getDate();
  

  return joinDate(year, month, day);
};

function joinDate(year: number, month: number, date: number) {
  if (!year && !month && !date) {
    return '';
  }

  return `${year}/${month}/${date}`;
};

function validateForm(Form: any) {
  const listPropertyType = ['Flat', 'House', 'Bungalow'];
  const listFurnitureTypes = ['Furnished', 'Unfurnished', 'PartFurnished'];

  let isValidate = [];

  for (const key in Form) {
    if (Object.prototype.hasOwnProperty.call(Form, key)) {
      const element = Form[key];
      
      switch (key) {
        case 'propertyType': {
          if (!listPropertyType.includes(element)) {
            isValidate.push('Property Type');
          }

          break;
        }

        case 'bedrooms': {
          if (!validateNumber(element)) {
            isValidate.push('Bedrooms');
          }

          break;
        }

        case 'dateTimeAdding': {
          if (!validateDate(element)) {
            isValidate.push('Date Time Adding')
          }

          break;
        }

        case 'monthlyRentPrice': {
          if (!validateNumber(element)) {
            isValidate.push('Monthly Rent Price');
          }

          break;
        }

        case 'furnitureTypes': {
          if (!listFurnitureTypes.includes(element)) {
            isValidate.push('Furniture Types');
          }

          break;
        }

        case 'notes': {
          break;
        }

        case 'nameReporter': {
          if (validateEmptyOrWhiteSpace(element)) {
            isValidate.push('Name Reporter')
          }

          break;
        }

        default: {
          isValidate.push(false);
        }
      }
    };
  };

  return isValidate;
};

function createMessageError(listError: any) {
  const message = listError.join(', ');

  return `You entered ${message} incorrectly`;
}

function validateDate(value: string) {
  const re = /^\d{4}[\/.]\d{1,2}[\/.]\d{1,2}$/;
  return re.test(value);
}

function validateEmptyOrWhiteSpace(value: string) {
  const re = /^\s*$/;
  return re.test(value);
}

function validateNumber(value: string) {
  const re = /^\d+$/;
  return re.test(value);
}

function showFurnitureTypes(val: string) {
  const Furnished = 'Furnished';
  const Unfurnished = 'Unfurnished';
  const PartFurnished = 'Part Furnished';

  switch (val) {
    case 'Furnished': {
      return Furnished;
    }

    case 'Unfurnished': {
      return Unfurnished;
    }

    case 'PartFurnished': {
      return PartFurnished;
    }

    default: {
      return '';
    }
  }
}

export {
  convertDate,
  validateForm,
  createMessageError,
  showFurnitureTypes,
};
