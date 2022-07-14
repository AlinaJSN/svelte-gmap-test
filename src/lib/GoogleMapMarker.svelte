<script>
  import { getContext, createEventDispatcher } from 'svelte'
  import icon from '../assets/marker_icon_sm.png'
  import { key } from './contexts.js'

  const dispatch = createEventDispatcher()

  const { getMap } = getContext(key)
  const map = getMap()

  export let lat
  export let lng
  export let radius

  // @ts-ignore
  const google = window.google

  $: {
    crcl.setRadius(radius * 1000)
    map.fitBounds(crcl.getBounds())
  }

  $: {
    crcl.setCenter({ lat, lng })
    mrkr.setPosition({ lat, lng })
  }

  const geocoder = new google.maps.Geocoder()

  var markerImage = new google.maps.MarkerImage(
    icon,
    new google.maps.Size(30, 30),
    new google.maps.Point(0, 0),
    new google.maps.Point(15, 15)
  )

  // eslint-disable-next-line no-new
  const mrkr = new google.maps.Marker({
    draggable: true,
    position: { lat, lng },
    map,
    icon: markerImage,
  })

  mrkr.addListener('drag', () => {
    crcl.setCenter({
      lat: mrkr.getPosition().lat(),
      lng: mrkr.getPosition().lng(),
    })
    console.log(`Dragging: lat ${mrkr.getPosition().lat()}, lng ${mrkr.getPosition().lng()}`)
  })

  mrkr.addListener('dragend', () => {
    lat = mrkr.position.lat()
    lng = mrkr.position.lng()
    geocoder
      .geocode({
        latLng: { lat, lng },
      })
      .then((results) => {
        dispatch('geocode', results)
      })
  })

  // eslint-disable-next-line no-new
  const crcl = new google.maps.Circle({
    strokeColor: '#0094FF',
    strokeOpacity: 0.2,
    strokeWeight: 2,
    fillColor: '#0094FF',
    fillOpacity: 0.2,
    map,
    center: { lat, lng },
    radius,
  })
</script>
