<script>
  import GoogleSdk from './GoogleSdk.svelte'
  import { createEventDispatcher, setContext } from 'svelte'
  import { key } from './contexts'

  setContext(key, {
    getMap: () => map,
    getGoogleMap: () => mapElement
  })

  const dispatch = createEventDispatcher()

  export let apiKey

  let mapElement
  let map

  export let lat
  export let lng
  export let zoom
  export let options = {}

  $: {
    map && map.setCenter({ lat, lng })
  }

  export function getDomBounds () {
    return mapElement.getBoundingClientRect()
  }

  export function getDefaultView () {
    return mapElement.ownerDocument.defaultView
  }

  export function setHeight (height) {
    mapElement.style.height = height
  }

  export function setMaxHeight (height) {
    mapElement.style.maxHeight = height
  }

  export function setCentre (location) {
    map.setCenter(location)
  }

  function initialise () {
    setTimeout(() => {
      // @ts-ignore
      const google = window.google
      map = new google.maps.Map(
        mapElement,
        Object.assign(
          {
            center: { lat, lng },
            zoom,
            disableDefaultUI: true
            // mapTypeId: "terrain", //satellite, hybrid and terrain
          },
          options
        )
      )

      google.maps.event.addListener(map, 'dragend', () => {
        const location = map.getCenter()
        dispatch('recentre', { location })
      })

      dispatch('ready')
    }, 1)
  }
</script>

<GoogleSdk {apiKey} on:ready={initialise} />
<div class="map" bind:this={mapElement}>
  {#if map}
    <slot />
  {/if}
</div>

<style>
  .map {
    height: 100%;
    width: 100%;
  }
</style>
