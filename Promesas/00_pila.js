const sumarUno = (valor) => valor + 1;

const sumarDos = (valor) => sumarUno(valor + 1);

const sumarTres = (valor) => sumarDos(valor + 1);

const calculo = () => {
  return sumarTres(1) + sumarDos(2);
};

calculo();
