document.addEventListener('DOMContentLoaded', function() {
  ymaps.ready(init);
  function init(){
    const myMap = new ymaps.Map("ya-map", {
      center: [55.759933, 37.615599],
      zoom: 13,
    });

    const myPlacemark = new ymaps.Placemark([55.769456, 37.638968], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'resources/map-point.svg',
      iconImageSize: [12, 12],
      iconImageOffset: [0, 0],
  });

    myMap.geoObjects.add(myPlacemark);
  }

  const mapdescr = document.querySelector('.ya-map__map-descr');
  const closeMapDescrBtn = document.querySelector('.map-descr__text-close');

  closeMapDescrBtn.addEventListener('click', function() {
    mapdescr.classList.add('ya-map__map-descr--closed');
  });
});
