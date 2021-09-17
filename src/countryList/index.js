const countryList = async function() {
  try {
    const countryListResult = [
      { name: 'Argentina', value: 'Argentina', code: '1' },
      { name: 'Bolivia', value: 'Bolivia', code: '2' },
      { name: 'Brazil', value: 'Brazil', code: '3' },
      { name: 'Colombia', value: 'Colombia', code: '4' },
      { name: 'Costa Rica', value: 'Costa Rica', code: '5' },
      { name: 'Chile', value: 'Chile', code: '6' },
      { name: 'Dominican Republic', value: 'Dominican Republic', code: '7' },
      { name: 'Ecuador', value: 'Ecuador', code: '8' },
      { name: 'El Salvador', value: 'El Salvador', code: '9' },
      { name: 'Guatemala', value: 'Guatemala', code: '10' },
      { name: 'Honduras', value: 'Honduras', code: '11' },
      { name: 'Mexico', value: 'Mexico', code: '12' },
      { name: 'Nicaragua', value: 'Nicaragua', code: '13' },
      { name: 'Panama', value: 'Panama', code: '14' },
      { name: 'Paraguay', value: 'Paraguay', code: '15' },
      { name: 'Peru', value: 'Peru', code: '16' },
      { name: 'Uruguay', value: 'Uruguay', code: '17' },
      { name: 'Venezuela', value: 'Venezuela', code: '18' }
    ];

    return countryListResult;
  } catch (e) {
    return window.open(`${window.location.origin}/api/user/login`, '_self');
  }
};

export default {
  countryList
};
