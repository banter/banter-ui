<template>    
  <div class="discussion-card-wrapper">
    <!-- border-variant="dark"  -->
    <b-card no-body class="overflow-hidden discussion-card" align="left">
      <b-row no-gutters>
        <b-col md="3">
          <div>
<b-card-img class="discussion-card-image rounded-0"  height="200px"  alt="Image" :src="discussion.podcastThumbnailUrl"></b-card-img>
            <b-iconstack scale="3"  class="discussion-icon">
      <b-icon stacked icon="circle-fill" variant="white"></b-icon>
      <b-icon stacked :icon="icon" variant="black"></b-icon>
      <b-icon stacked icon="circle" variant="white"></b-icon>
    </b-iconstack>
                    <div class="discussion-timestamp">
          <p style="margin-bottom:0px">
            {{`${discussionDuration(discussion)}`}}
          </p>
        </div>
          </div>
        </b-col>
        <b-col md="9">
          <b-card-body>
              <b-row>
                  <b-card-text class="podcast-description-text">
                    {{discussion.description}}
            </b-card-text>
              </b-row>
              <b-row>
                  <b-card-text class="podcast-name-text" >
                    {{`${discussion.podcastTitle}`}} • {{`${discussionDate(discussion) && discussionDate(discussion).fromNow()}`}} 
            </b-card-text>
              </b-row>
            <b-row>
              <div class="tag-display">
                <b-icon icon="tag-fill"></b-icon>
                <b-badge v-for="tag in discussion.tags" :key="tag.id" variant="light">
                  <router-link :to="`/topics/${tag.value}`">
                    {{tag.value}}
                  </router-link>    
                </b-badge>
              </div>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>


<script>
export default {
  name: 'DiscussionCard',
  props: {
    icon: {
      type: String,
      required: true,
      default: () => "play"
    },
      
    discussion: {
    type: Object,
    required: true,
    default: () => { return {}}
}
  },  
  methods: {
    discussionDate(discussion){
      if (discussion?.episodePublishDate) {
        return this.$moment(`${discussion.episodePublishDate.monthValue}-${discussion.episodePublishDate.dayOfMonth}-${discussion.episodePublishDate.year}`)
      } else {
        return null
      }
    },
    
    discussionDuration(discussion){
      // TODO Handle Discussion Duration / get from API Response
      // ({{discussion.startTime}}-{{discussion.endTime || 'End'}})
      //  - discussion.endTime || 'End'
      (discussion.startTime)
      return "TBD"
    }
  }

}
</script>

<style lang="scss" scoped>



.discussion-icon {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    opacity: .80;
}

.discussion-card-wrapper {
  margin: auto;
  cursor: pointer;
  padding: 15px;
}

.discussion-card{
    max-width: 785px;
    min-width: 240px;
    margin: auto;
    background: #FFFFFF;
    box-shadow: 0px 3.08995px 7.72488px rgba(0, 0, 0, 0.4);
      &:hover {
    .card-img.discussion-card-image {
      background:rgba(0,0,0,0.6);
      transition: all 1s;
      opacity: 0.5;
      &:after {
        opacity: 1;
      }
    }
  }
}

.podcast-name-text{
      size: 100px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 15.4498px;
    line-height: 22px;
    /* identical to box height, or 145% */
    letter-spacing: 0.193122px;
    color: #606060;
}
.podcast-description-text {
  font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 18.5397px;
line-height: 26px;
/* or 142% */
letter-spacing: 0.193122px;
color: #030303;
}


.card-img.discussion-card-image {
  object-fit: contain;
  position: relative;
  padding: 15px;

  .podcast-image {
        position: absolute;
    object-fit: cover;
    max-width: 100%;
    width: 100%;
    height: 100%;
    top: 50%;     
    left: 50%;
    transform: translate( -50%, -50%);
    border-radius: 25px;
  }
}

  .discussion-timestamp {
    position: absolute;
    background-color: black;
    opacity: .95;
    color: white;
    padding: 3px;
    bottom: 20px;
    right:20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .discussion-timestamp-text {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    text-align: center;
    height: 100%;
  }

.tag-display a {
  font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 16.9947px;
line-height: 15px;
/* or 91% */

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.193122px;
color: #030303;
}

.tag-display span {
  margin: 2px;
}


</style>