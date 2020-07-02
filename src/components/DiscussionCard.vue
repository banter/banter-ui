<template>
  <!-- <div class="discussion-card-wrapper" style="background-color: coral;">
        <div class="d-flex w-100 justify-content-between flex-column" style="background-color: aqua;">
          <b-img class="podcast-thumbnail" :src="`https://chumley.barstoolsports.com/union/2020/06/30/006bc1bb.jpg?crop=1400%3A1400%2Csmart`"/>
    
                    <div class="discussion-text-content">
                  <h5 class="mb-1">TEXT CONENTNENNT</h5>
                  <p class="mb-1">DISCUSSION CONTENT</p>
                </div>
                </div> -->
      <!-- </div> -->
  <div class="discussion-card-wrapper">
    <b-card no-body class="overflow-hidden discussion-card" >
      <b-row no-gutters>
        <b-col md="3">
            <b-card-img class="discussion-card-image rounded-0"  height="200px"  alt="Image" src="https://chumley.barstoolsports.com/union/2020/06/30/006bc1bb.jpg?crop=1400%3A1400%2Csmart"></b-card-img>
        </b-col>
        <b-col md="9">
          <b-card-body title="Horizontal Card">

              <b-row>
                  <b-card-text class="discussion-card-text">
              This is a wider card with supporting text as a natural lead-in to additional content.
              This content is a little bit longer.
            </b-card-text>
              </b-row>

              <b-row>
                  <b-card-text class="discussion-card-text">
              Name of pod
            </b-card-text>
              </b-row>


            <b-row>
                  <b-card-text class="discussion-card-text">
              Tags
            </b-card-text>
            </b-row>
            
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>


<script>
export default {
  name: 'TopicHeader',
  props: {
    topic: {
      type: Object,
      required: true,
      default: () => {return {"value": "Austin"}}
    }
  },
    type: {
    type: String,
    required: true,
    default: () => ""
}
}
</script>

<style lang="scss" scoped>

.discussion-card-wrapper {
  margin: auto;
//   height: 250px;
}

.discussion-card{
    max-width: 785px;
    min-width: 320px;
    margin: auto;
}

.content-card-wrapper {
    width: 95%;
    height: 95%;
    margin: auto;
}

.card-img.discussion-card-image {
  object-fit: contain;
  padding: 15px;
}

.discussion-text-content {
  display: flex;
  flex-direction: column;
  width: 70%;
}

// Min width 
// Max Width 

</style>