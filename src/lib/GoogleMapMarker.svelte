<script>
  import { getContext, createEventDispatcher } from "svelte";

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

  // eslint-disable-next-line no-new
  const mrkr = new window.google.maps.Marker({
    draggable: true,
    position: { lat, lng },
    map,
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
    strokeColor: "#22a7f0",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#22a7f0",
    fillOpacity: 0.35,
    map,
    center: { lat, lng },
    radius,
  });
</script>
