<script>
  import "../assets/normalize.css";
  import "../assets/prettify.css";
  import "../assets/style.css";
  import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete.svelte";
  import GoogleMap from "./GoogleMap.svelte";
  import GoogleMapMarker from "./GoogleMapMarker.svelte";
  import Slider from "@bulatdashiev/svelte-slider";
  import SvelteTooltip from "svelte-tooltip";

  let apiKey = "AIzaSyB5HYrOwNUgeMxMWUx3QGp8fev-PWjFoYw";

  let address = { lat: 43, lng: -75 };
  let addressFieldId;
  let radius = [5, 65];
  let radiusFieldId;
  let viewValue = "";

  $: tip = `${radius[0]} km`;

  function parseAddress(ev) {
    const { place } = ev.detail;
    address = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
  }
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=latin,cyrillic"
    rel="stylesheet"
    type="text/css"
  />
</svelte:head>
<header class="shadow">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-xs-12">
        <div class="slogan">Svelte Google Maps</div>
      </div>
    </div>
  </div>
</header>
<section class="content">
  <h1 class="center">Show your add in right places</h1>
  <div class="container card main">
    <div class="row">
      <div class="content-info col-md-6 col-lg-6 col-xs-12">
        <div class="padding-left-15 padding-right-15" id="address-autocomplete">
          <form on:submit|preventDefault={() => ({})}>
            <label for={addressFieldId}>
              <span class="text-bold">Advertize near the address</span>
              <GooglePlacesAutocomplete
                bind:id={addressFieldId}
                {apiKey}
                types={["geocode"]}
                fields={["address_component", "geometry"]}
                bind:viewValue
                on:placeChanged={parseAddress}
                placeholder="Search..."
              />
            </label>
            <label for={radiusFieldId}>
              <span class="text-bold">Set Radius</span>
              <Slider
                min={5}
                max={65}
                step={1}
                bind:value={radius}
                bind:id={radiusFieldId}
              >
                <div class="tooltip-wrapper">
                  <SvelteTooltip bind:tip bottom active color="#22a7f0">
                    <span class="handler">&nbsp;</span>
                  </SvelteTooltip>
                </div>
              </Slider>
            </label>
          </form>
        </div>
      </div>
      <div class="content-map col-md-6 col-lg-6 col-xs-12 padding-right-0">
        <div class="mini-map">
          <GoogleMap
            {apiKey}
            bind:lat={address.lat}
            bind:lng={address.lng}
            zoom={10}
          >
            <GoogleMapMarker
              on:geocode={(e) => {
                viewValue = e.detail.results[0].formatted_address;
              }}
              bind:lat={address.lat}
              bind:lng={address.lng}
              bind:radius={radius[0]}
            />
          </GoogleMap>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  form label {
    display: flex;
    margin: 6px 0;
    flex-direction: column;
  }

  form label * {
    width: 100%;
  }

  form label span {
    display: flex;
    /* justify-content: center; */
    padding: 6px 12px 6px 0;
  }
  .handler {
    background-color: rgb(34, 167, 240);
    border-radius: 20px;
    padding: 0;
    width: 18px;
  }

  .tooltip-wrapper {
    color: white;
  }

  .mini-map {
    display: flex;
    flex: 1;
    height: 500px;
  }
</style>
