<template>
  <div class="mapstatus container">
    <div id="map"></div>

  </div>
</template>

<script>
  export default {
  name: 'hello',
  data () {
    return {
    }
  },
  methods: {
    getAjax () {
      // GET /someUrl
      this.$http.get('https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json').then(response => {
      // get body data
      //this.someData = response.body;
      let content = [];
      content.push(response.body);
      let data = content[0].DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
      //console.log(data);

      var uluru = {lat: 25.045992, lng: 121.5178559,};
      //設定中心點座標
      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: uluru,
      });

      //
      let Len = data.length;
      for( let i = 0; i< Len; i++) {
        if(data[i].Name == "電力停電" && data[i].CaseComplete == 'true') {
          data[i].CaseComplete = '已處理';
          var contentString =`
          <div id="content">
            日期: ${data[i].DPName}<br>
            時間: ${data[i].CaseTime}<br>
            地區: ${data[i].CaseLocationDistrict} <br>
            地點: ${data[i].CaseLocationDescription}<br>
            狀況: ${data[i].Name}<br>
            處理狀況: ${data[i].CaseComplete}
          </div>
          `;
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          uluru = {lat: parseFloat(data[i].Wgs84Y), lng: parseFloat(data[i].Wgs84X)};
          var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: 'Uluru (Ayers Rock)'
          });
          google.maps.event.addListener(marker, 'click', (function(marker, content) {
            return function() {
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
          })(marker, contentString));
        }else if(data[i].Name == "電力停電" && data[i].CaseComplete == 'false'){
          data[i].CaseComplete = '未處理';
          var contentString =`
          <div id="content">
            日期: ${data[i].DPName}<br>
            時間: ${data[i].CaseTime}<br>
            地區: ${data[i].CaseLocationDistrict} <br>
            地點: ${data[i].CaseLocationDescription}<br>
            狀況: ${data[i].Name}<br>
            處理狀況: ${data[i].CaseComplete}
          </div>
          `;
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          uluru = {lat: parseFloat(data[i].Wgs84Y), lng: parseFloat(data[i].Wgs84X)};
          var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: 'Uluru (Ayers Rock)'
          });
          google.maps.event.addListener(marker, 'click', (function(marker, content) {
            return function() {
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
          })(marker, contentString));
        }

      }

      });

    }
  },
    mounted () {
      this.getAjax();
    }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map {
    width: 800px;
    height: 600px;
  }
  @media screen and (max-width:1024px){
    #map {
    width: 650px;
    height: 600px;
    }
  }

  @media screen and (max-width:768px){
    #map {
    width: 380px;
    height: 500px;
    }
  }

  @media screen and (max-width:418px){
    #map {
    width: 320px;
    height: 375px;
    }
  }



</style>
