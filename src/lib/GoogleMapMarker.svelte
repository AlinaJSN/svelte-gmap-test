<script>
  import { getContext, createEventDispatcher } from "svelte";
  import icon from '../assets/marker_icon.png';
  import { key } from "./contexts.js";

  const dispatch = createEventDispatcher()

  const { getMap } = getContext(key);
  const map = getMap();

  export let lat;
  export let lng;
  export let radius;

  $: {
    crcl.setRadius(radius * 1000);
  }

  $: {
    crcl.setCenter({ lat, lng });
    mrkr.setPosition({ lat, lng });
  }

  const geocoder = new window.google.maps.Geocoder();
  const google = window.google;

  var markerImage = new google.maps.MarkerImage(icon,
                new google.maps.Size(56, 56),
                new google.maps.Point(0, 0),
                new google.maps.Point(28, 28));

  // eslint-disable-next-line no-new
  const mrkr = new window.google.maps.Marker({
    draggable: true,
    position: { lat, lng },
    map,
    icon: markerImage,
  });

  mrkr.addListener("drag", () => {
    crcl.setCenter({
      lat: mrkr.getPosition().lat(),
      lng: mrkr.getPosition().lng(),
    });
  });

  mrkr.addListener("dragend", () => {
    lat = mrkr.position.lat();
    lng = mrkr.position.lng();
    geocoder
      .geocode({
        latLng: { lat, lng },
      })
      .then((results) => {
        dispatch("geocode", results);
      });
  });

  // eslint-disable-next-line no-new
  const crcl = new window.google.maps.Circle({
    strokeColor: "#0094FF",
    strokeOpacity: 0.2,
    strokeWeight: 2,
    fillColor: "#0094FF",
    fillOpacity: 0.2,
    map,
    center: { lat, lng },
    radius,
  });
</script>
