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
    created() {

    },
  methods: {
    getAjax () {
      // GET /someUrl
      this.$http.get('https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json').then(response => {
      //console.log(response);
      // get body data
      //this.someData = response.body;
      let content = [];
      content.push(response.body);
      let data = content[0].DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
      //this.tableData3 = data;
      //let list = document.querySelector('.list');


      //list.innerHTML = str;
      console.log(data);
      //設定中心點座標
      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 25.045992, lng: 121.5178559},
      });

      //跑迴圈依序將值塞入到 marker
      let Len = data.length;
      for( let i = 0; i< Len; i++) {

        if(data[i].Name == "電力停電") {
          var str ={};
          var place = {};
          place.lat = parseFloat(data[i].Wgs84Y);
          place.lng = parseFloat(data[i].Wgs84X);

          str.map = map;
          str.title = `狀況: ${data[i].Name} \n地區:${data[i].CaseLocationDistrict} \n地點: ${data[i].CaseLocationDescription}\n時間: ${data[i].CaseTime}`;
          str.position = place;
          console.log(str);
          new google.maps.Marker(str);
        }

      }

      });

    },
    initMap() {




    }
  },
    mounted () {
      this.getAjax();
      //this.initMap();
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
