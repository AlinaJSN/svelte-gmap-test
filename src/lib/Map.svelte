<script>
  import "@fontsource/plus-jakarta-sans";
  import "../assets/normalize.css";
  import "../assets/prettify.css";
  import "../assets/style.css";
  import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete.svelte";
  import GoogleMap from "./GoogleMap.svelte";
  import GoogleMapMarker from "./GoogleMapMarker.svelte";
  import Slider from "@bulatdashiev/svelte-slider";
  import SvelteTooltip from "svelte-tooltip";

  let apiKey = "AIzaSyB5HYrOwNUgeMxMWUx3QGp8fev-PWjFoYw";
  let address = { lat: 34.0352206, lng: -118.2434967 };
  let addressFieldId;
  let radius = [15, 65];
  let radiusFieldId;
  let viewValue = "32 Merchant str., Los Angeles, USA";

  $: tip = `${radius[0]} km`;

  function parseAddress(ev) {
    const { place } = ev.detail;
    address = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
  }
</script>

<header class="shadow">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-xs-12 center">
        <svg
          width="140"
          height="42"
          viewBox="0 0 140 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M52.4163 38.0275L52.4731 38.1316H52.5918H52.8064H52.9275L52.9836 38.0243L62.6401 19.5699L62.7932 19.2771H62.4628H57.6557H57.525L57.4725 19.3969L52.8409 29.9743L47.794 19.3911L47.7396 19.2771H47.6134H42.5061H42.1689L42.3306 19.5731L52.4163 38.0275Z"
            fill="#030916"
            stroke="#030916"
            stroke-width="0.4"
          />
          <path
            d="M68.4617 19.8165L68.4616 19.8166C66.9144 20.664 65.7014 21.8259 64.8241 23.3019C63.9459 24.7796 63.5083 26.4394 63.5083 28.2752C63.5083 30.2519 63.952 31.984 64.8464 33.4641C65.7374 34.9416 66.9527 36.0754 68.4879 36.8652C70.0217 37.6543 71.7489 38.046 73.665 38.046C75.6962 38.046 77.4704 37.6178 78.9791 36.7536C80.4826 35.8923 81.6599 34.7228 82.5086 33.2458L82.5086 33.2458C83.357 31.7686 83.7795 30.1097 83.7795 28.2752C83.7795 26.4411 83.3633 24.784 82.5299 23.3059L82.5298 23.3057C81.6953 21.8289 80.5245 20.666 79.0201 19.8178L79.02 19.8177C77.5118 18.9686 75.7249 18.5477 73.7506 18.5477C71.7753 18.5477 70.0114 18.969 68.4617 19.8165ZM68.9917 31.25L68.9916 31.2498C68.5411 30.4157 68.306 29.4852 68.2874 28.4523V28.3186C68.2874 27.262 68.5225 26.2938 68.9935 25.4078L68.9935 25.4078C69.4644 24.521 70.099 23.8174 70.9001 23.293C71.695 22.7731 72.6005 22.5106 73.6228 22.5106C75.1991 22.5106 76.4813 23.0685 77.4869 24.1832C78.495 25.3019 79.0016 26.6768 79.0016 28.3198C79.0016 29.9628 78.495 31.3299 77.4876 32.4338L77.4876 32.4339C76.4836 33.5353 75.2013 34.0856 73.6228 34.0856C72.6283 34.0856 71.7285 33.8303 70.9174 33.3216C70.1035 32.8112 69.4617 32.1222 68.9917 31.25Z"
            fill="#030916"
            stroke="#030916"
            stroke-width="0.4"
          />
          <path
            d="M91.165 19.8165L91.1649 19.8166C89.6177 20.664 88.4047 21.8259 87.5274 23.3019C86.6493 24.7796 86.2117 26.4394 86.2117 28.2752C86.2117 30.2519 86.6553 31.984 87.5498 33.4641C88.4407 34.9416 89.656 36.0754 91.1912 36.8652C92.725 37.6543 94.4522 38.046 96.3683 38.046C98.3996 38.046 100.174 37.6178 101.682 36.7536C103.186 35.8923 104.363 34.7228 105.212 33.2458L105.212 33.2458C106.06 31.7686 106.483 30.1097 106.483 28.2752C106.483 26.4411 106.067 24.784 105.233 23.3059L105.233 23.3057C104.399 21.8289 103.228 20.666 101.723 19.8178L101.723 19.8177C100.215 18.9686 98.4283 18.5477 96.454 18.5477C94.4787 18.5477 92.7148 18.969 91.165 19.8165ZM91.6951 31.25L91.695 31.2498C91.2251 30.3798 90.9896 29.405 90.9896 28.3186C90.9896 27.262 91.2247 26.2938 91.6956 25.4078L91.6957 25.4078C92.1665 24.521 92.8011 23.8174 93.6022 23.293C94.3971 22.7731 95.3026 22.5106 96.3249 22.5106C97.9012 22.5106 99.1834 23.0685 100.189 24.1832C101.197 25.3019 101.704 26.6768 101.704 28.3198C101.704 29.9628 101.197 31.3299 100.19 32.4338L100.19 32.4339C99.1857 33.5353 97.9034 34.0856 96.3249 34.0856C95.3316 34.0856 94.4318 33.8303 93.6207 33.3216C92.8068 32.8112 92.165 32.1222 91.6951 31.25Z"
            fill="#030916"
            stroke="#030916"
            stroke-width="0.4"
          />
          <path
            d="M110.661 3.86833H110.461V4.06833V37.4168V37.6168H110.661H114.995H115.195V37.4168V4.06833V3.86833H114.995H110.661Z"
            fill="#030916"
            stroke="#030916"
            stroke-width="0.4"
          />
          <path
            d="M122.635 11.422H122.435V11.622V19.3194H119.459H119.259V19.5194V22.9098V23.1098H119.459H122.435V37.4168V37.6168H122.635H127.012H127.212V37.4168V23.1098H131.82H132.02V22.9098V19.5194V19.3194H131.82H127.212V11.622V11.422H127.012H122.635Z"
            fill="#030916"
            stroke="#030916"
            stroke-width="0.4"
          />
          <path
            d="M137.18 35.2045C137.533 33.7056 136.605 32.2036 135.106 31.8499C133.607 31.4961 132.105 32.4244 131.751 33.9233C131.398 35.4223 132.326 36.9242 133.825 37.278C135.324 37.6318 136.826 36.7034 137.18 35.2045Z"
            fill="#FFD20A"
            stroke="#FFD20A"
            stroke-width="0.4"
          />
          <path
            d="M26.7261 2.47811L26.9711 2.03334H26.4633H22.7461H22.5689L22.4834 2.18856L20.9484 4.97405H1.28946H0.769846L1.02965 5.42405L17.1125 33.2806L17.3701 33.7268L17.631 33.2825L29.1587 13.6488L29.424 13.1969H28.9H20.8208L26.7261 2.47811ZM14.8042 17.0523H22.6887L17.3974 26.0645L7.4481 8.82944H18.8262L14.5414 16.6076L14.2964 17.0523H14.8042Z"
            fill="#FFD20A"
            stroke="#FFD20A"
            stroke-width="0.6"
          />
          <path
            d="M19.0163 36.2613L18.9297 36.4113L19.0163 36.5613L20.896 39.8167L21.1558 40.2666L21.4156 39.8167L41.2723 5.42405L41.5321 4.97405H41.0125H27.6774H27.4999L27.4145 5.1297L25.6276 8.38509L25.3837 8.82944H25.8906H34.8538L19.0163 36.2613Z"
            fill="#030916"
            stroke="#030916"
            stroke-width="0.6"
          />
        </svg>
      </div>
    </div>
  </div>
</header>
<section class="content">
  <h1 class="center hidden-xs">Show your add in right places</h1>
  <div class="container card main" style="max-width: 860px">
    <div class="row">
      <div class="content-info col-md-6 col-lg-6 col-xs-12">
        <div class="padding-left-15 padding-right-15" id="address-autocomplete">
          <h1 class="center shown-xs form-cap" style="margin-top: 40px">Show your add in right places</h1>
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
              <div class="legend color-grey">
                <div class="child">0 km</div>
                <div class="child center">30 km</div>
                <div class="child right">60 km</div>
              </div>
              <Slider
                min={5}
                max={65}
                step={1}
                bind:value={radius}
                bind:id={radiusFieldId}
              >
                <div class="tooltip-wrapper">
                  <SvelteTooltip bind:tip bottom active color="#0094FF">
                    <span class="handler">&nbsp;</span>
                  </SvelteTooltip>
                </div>
              </Slider>
            </label>
            <div class="info-block color-grey padding-left-8 padding-right-8">
              Your ad shows to people in the locations you set up, and to people
              interested in these locations.
            </div>
          </form>
        </div>
      </div>
      <div
        class="content-map col-md-6 col-lg-6 col-xs-12 padding-right-0 padding-left-0"
      >
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
  <div class="container margin-top-80 margin-bottom-50">
    <div class="row">
      <div class="col-md-6 right padding-right-5">
        <button class="btn white " style="width: 180px;" type="button"
          ><span>Back</span></button
        >
      </div>
      <div class="col-md-6 left padding-left-5">
        <button class="btn yellow" style="width: 180px;" type="button"
          ><span>Continue</span></button
        >
      </div>
    </div>
  </div>
</section>

<style>
  form label {
    display: flex;
    margin: 25px 0;
    flex-direction: column;
  }

  form label .legend {
    margin-bottom: -10px;
    margin-left: 0px;
    margin-right: 0px;
    padding-right: 8px;
    padding-left: 8px;
    display: flex;
  }

  form label * {
    width: 100%;
  }

  form label span {
    display: flex;
    /* justify-content: center; */
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    /* identical to box height, or 157% */

    letter-spacing: 0.1px;
    padding: 6px 12px 16px 8px;
  }
  .handler {
    background-color: #0094ff;
    border-radius: 20px;
    padding: 0;
    width: 16px;
    line-height: 16px;
  }

  .tooltip-wrapper {
    color: white;
  }

  .mini-map {
    display: flex;
    flex: 1;
    height: 380px;
  }
  .info-block{
    margin-top: 85px;
  }
</style>
