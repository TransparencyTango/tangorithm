import React, { Component } from 'react';
import Webcam from 'react-webcam';

var pics = {
  "default":  require('./img/default.jpg'),
  "pink":     require('./img/pink_hair.jpg'),
  "green":    require('./img/green_hair.jpg'),
  "punk1":    require('./img/green_hair.jpg')
};

class Mirror extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "isReflection": false,
      "name" : null,
      "reflectionPic": "default",
      "showKNN": false,
      "showSimilarities": true,
      "knns": [],
      "similarities": []
    };
    this.timer = null;
    this.fetchStatus = this.fetchStatus.bind(this);
    this.updateReflection = this.updateReflection.bind(this);
  }

  updateReflection = (result) => {
    const reflectionName = result.name;
    let reflectionPic = "default";
    if (pics.hasOwnProperty(reflectionName)) {
      reflectionPic = reflectionName
    }

    return this.setState({isReflection: result.isReflection === "True",
                          name: reflectionName,
                          reflectionPic: reflectionPic,
                          showSimilarities: result.showSimilarities === "True",
                          showKNN: result.showKNN === "True",
                          knns: result.knns,
                          similarities: result.similarities
                        });
  }

  fetchStatus = () => {
    fetch('/getMirrorState', {
      method: "GET",
      header: {
        accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(this.updateReflection)
      .catch(e => console.log(e));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.name !== nextState.name || this.state.showKNN !== nextState.showKNN ||
    this.state.showSimilarities !== nextState.showSimilarities || this.state.knns !== nextState.knns ||
    this.state.similarities !== nextState.similarities;
  }

  componentDidMount() {
    this.timer = setInterval(() => this.fetchStatus(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  parseSimilarities() {
    let similarities = [];
    this.state.similarities.forEach((element) => {
      similarities.push(((element+1)/2).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}));
    });
    return <React.Fragment>


              <div class="blackFont">
              <br/>
              You're gonna be successfully: {similarities[0]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "eventually": {similarities[1]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "effectively": {similarities[2]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "managed": {similarities[3]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "subsequently": {similarities[4]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "ultimately": {similarities[5]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "aided": {similarities[6]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "pursued": {similarities[7]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "assisted": {similarities[8]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "quickly": {similarities[9]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "begun": {similarities[10]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "simultaneously": {similarities[11]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "entered": {similarities[12]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "determined": {similarities[13]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "soon": {similarities[14]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a looser: {similarities[15]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "restrictive": {similarities[16]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "loosening": {similarities[17]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "inflexible": {similarities[18]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "polices": {similarities[19]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "tighter": {similarities[20]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "dictated": {similarities[21]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "rigid": {similarities[22]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "conforming": {similarities[23]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "dictating": {similarities[24]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "rigidly": {similarities[25]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "instituting": {similarities[26]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "cumbersome": {similarities[27]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "constrained": {similarities[28]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "burdensome": {similarities[29]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be loved: {similarities[30]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "remember": {similarities[31]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "friends": {similarities[32]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "wonder": {similarities[33]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "remembered": {similarities[34]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "loves": {similarities[35]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "imagine": {similarities[36]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "liked": {similarities[37]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "beloved": {similarities[38]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "remembers": {similarities[39]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "knew": {similarities[40]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "tell": {similarities[41]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "wonders": {similarities[42]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "reminds": {similarities[43]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "dad": {similarities[44]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be hated: {similarities[45]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "despised": {similarities[46]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "betrayed": {similarities[47]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "loathed": {similarities[48]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hates": {similarities[49]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "obsessed": {similarities[50]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "evidently": {similarities[51]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "cursed": {similarities[52]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "theirs": {similarities[53]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "scorned": {similarities[54]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "dreamed": {similarities[55]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "ironically": {similarities[56]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "adored": {similarities[57]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "dislikes": {similarities[58]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a criminal: {similarities[59]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "crime": {similarities[60]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "crimes": {similarities[61]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "charged": {similarities[62]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prosecution": {similarities[63]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "charges": {similarities[64]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "alleged": {similarities[65]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "investigating": {similarities[66]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prosecuting": {similarities[67]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "guilty": {similarities[68]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "conspiracy": {similarities[69]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "case": {similarities[70]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prosecuted": {similarities[71]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "investigate": {similarities[72]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "involvement": {similarities[73]} <br/>
              </div>


              <div class="blackFont">
              <br/>
              You will be a victim: {similarities[74]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "death": {similarities[75]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "killer": {similarities[76]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "finds": {similarities[77]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "witness": {similarities[78]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "child": {similarities[79]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "murder": {similarities[80]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "escaped": {similarities[81]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "man": {similarities[82]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "woman": {similarities[83]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "suspect": {similarities[84]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "escapes": {similarities[85]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "survived": {similarities[86]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "another": {similarities[87]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "innocent": {similarities[88]} <br/>
              </div>


              <div class="blackFont">
              <br/>
              You will be suicidal: {similarities[89]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "ideation": {similarities[90]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "homicidal": {similarities[91]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "impulsive": {similarities[92]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "tendencies": {similarities[93]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "psychotic": {similarities[94]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "antisocial": {similarities[95]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "sociopathic": {similarities[96]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "delusional": {similarities[97]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "self-destructive": {similarities[98]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "paranoid": {similarities[99]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "impetuous": {similarities[100]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "demented": {similarities[101]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "psychopath": {similarities[102]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "narcissistic": {similarities[103]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a hostess: {similarities[104]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "waitress": {similarities[105]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hairdresser": {similarities[106]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "diner": {similarities[107]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "bartender": {similarities[108]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "showbiz": {similarities[109]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "caterer": {similarities[110]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "waiter": {similarities[111]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "emcee": {similarities[112]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "barmaid": {similarities[113]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "catered": {similarities[114]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "saucy": {similarities[115]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "swanky": {similarities[116]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "restaurateur": {similarities[117]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "twinkies": {similarities[118]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a fireman: {similarities[119]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "firefighter": {similarities[120]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "janitor": {similarities[121]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "driscoll": {similarities[122]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "blackmailer": {similarities[123]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "crewman": {similarities[124]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "medic": {similarities[125]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hires": {similarities[126]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mechanic": {similarities[127]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "chauffeur": {similarities[128]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "cabbie": {similarities[129]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "watchman": {similarities[130]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "paramedic": {similarities[131]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "vetter": {similarities[132]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "gunning": {similarities[133]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be nurse: {similarities[134]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "nurses": {similarities[135]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "pediatrician": {similarities[136]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "counselor": {similarities[137]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "therapist": {similarities[138]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "pregnant": {similarities[139]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "nursing": {similarities[140]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "surgeon": {similarities[141]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "paramedic": {similarities[142]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "physician": {similarities[143]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "psychiatrist": {similarities[144]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "toddler": {similarities[145]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "teacher": {similarities[146]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "patient": {similarities[147]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a waitress: {similarities[148]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "bartender": {similarities[149]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "waiter": {similarities[150]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hairdresser": {similarities[151]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "housekeeper": {similarities[152]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "homemaker": {similarities[153]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "receptionist": {similarities[154]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "diner": {similarities[155]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "housewife": {similarities[156]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "schoolteacher": {similarities[157]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hostess": {similarities[158]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prostitute": {similarities[159]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mom": {similarities[160]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "janitor": {similarities[161]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "fiance": {similarities[162]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You're gonna be a policeman: {similarities[163]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "soldier": {similarities[164]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "gunman": {similarities[165]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "fatally": {similarities[166]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "policemen": {similarities[167]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "assailant": {similarities[168]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "gunned": {similarities[169]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "wounding": {similarities[170]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "attacker": {similarities[171]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "killing": {similarities[172]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "assailants": {similarities[173]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "injuring": {similarities[174]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "guards": {similarities[175]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "attackers": {similarities[176]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "police": {similarities[177]} <br/>
              </div>

              <div class="blackFont">
              You will be a nursery: {similarities[178]}
              </div>
              <div class="blackFont">
              <br/>
              "nurseries": {similarities[179]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "cottage": {similarities[180]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "orchard": {similarities[181]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "barn": {similarities[182]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "sunnyside": {similarities[183]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "vine": {similarities[184]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "playground": {similarities[185]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "ivy": {similarities[186]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "elms": {similarities[187]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "sheds": {similarities[188]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "gardening": {similarities[189]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "heronswood": {similarities[190]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "tending": {similarities[191]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "farm": {similarities[192]} <br/>
              </div>


              <div class="blackFont">
              <br/>
              You will be a judge: {similarities[193]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "court": {similarities[194]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "attorney": {similarities[195]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prosecutor": {similarities[196]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "appeals": {similarities[197]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "lawyer": {similarities[198]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "justice": {similarities[199]} <br/>
              </div>
              <div class="blackFont"> <br/>
              "jury",: {similarities[200]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prosecution": {similarities[201]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "judges": {similarities[202]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "magistrate": {similarities[203]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              defendant": {similarities[204]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "supreme": {similarities[205]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hearing": {similarities[206]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "case": {similarities[207]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a professor: {similarities[208]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "harvard": {similarities[209]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "associate": {similarities[210]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "sociology": {similarities[211]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "emeritus": {similarities[212]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "emeritus": {similarities[213]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "psychologist": {similarities[214]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "yale": {similarities[215]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "researcher": {similarities[216]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "lecturer": {similarities[217]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "scientist": {similarities[218]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "sociologist": {similarities[219]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "scholar": {similarities[220]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "studied": {similarities[221]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "university": {similarities[222]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "economics": {similarities[223]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a teacher: {similarities[224]} <br/>
              </div>
              <div class="blackFont">
              "student": {similarities[225]}
              </div>
              <div class="blackFont">
              <br/>
              "taught": {similarities[226]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "teaches": {similarities[227]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "teaching": {similarities[228]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "graduate": {similarities[229]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "teachers": {similarities[230]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "classmate": {similarities[231]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "tutor": {similarities[232]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "schoolteacher": {similarities[233]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "counselor": {similarities[234]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "colleague": {similarities[235]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "master": {similarities[236]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "school": {similarities[237]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mentor": {similarities[238]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a plumber: {similarities[239]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "janitor": {similarities[240]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "electrician": {similarities[241]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "tradesman": {similarities[242]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "roofer": {similarities[243]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "newspaperman": {similarities[244]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "landscaper": {similarities[245]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "cabdriver": {similarities[246]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "welder": {similarities[247]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "bricklayer": {similarities[248]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "curmudgeon": {similarities[249]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "tinkerer": {similarities[250]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "layabout": {similarities[251]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "woodworker": {similarities[252]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "storekeeper": {similarities[253]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You're gonna be a technician: {similarities[254]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "technologist": {similarities[255]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mechanic": {similarities[256]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "engineer": {similarities[257]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "technicians": {similarities[258]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "dentist": {similarities[259]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "paramedic": {similarities[260]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "orthopedic": {similarities[261]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "instructor": {similarities[262]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "lab": {similarities[263]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "specialist": {similarities[264]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "internist": {similarities[265]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "programmer": {similarities[266]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "contractor": {similarities[267]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "welder": {similarities[268]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a roofer: {similarities[269]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "landscaper": {similarities[270]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "softy": {similarities[271]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "chiropractor": {similarities[272]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "manicurist": {similarities[273]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "janitor": {similarities[274]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "doddering": {similarities[275]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "podiatrist": {similarities[276]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "crackhead": {similarities[277]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "ninny": {similarities[278]} <br/>
              <div class="blackFont">
              <br/>
              "cowhand": {similarities[279]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "plasterer": {similarities[280]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "tinkerer": {similarities[281]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "locksmith": {similarities[282]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "welder": {similarities[283]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a locomotive driver: {similarities[284]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "driver": {similarities[285]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "cab": {similarities[286]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mechanic": {similarities[287]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "car": {similarities[288]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "tractor": {similarities[289]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "driving": {similarities[290]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "bicycle": {similarities[291]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "lorry": {similarities[292]} <br/>
              </div>
              <div class="blackFont">
              "vehicle": {similarities[293]}
              </div>
              <div class="blackFont">
              <br/>
              "truck": {similarities[294]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "powered": {similarities[295]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "wheel": {similarities[296]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "wagon": {similarities[297]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "carriage": {similarities[298]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You're gonna be a forester: {similarities[299]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "moulton": {similarities[300]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "esmond": {similarities[301]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "gage": {similarities[302]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "atwood": {similarities[303]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "forsythe": {similarities[304]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "huck": {similarities[305]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "stoddard": {similarities[306]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mundy": {similarities[307]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "parson": {similarities[308]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "oly-2004-box": {similarities[309]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "nell": {similarities[310]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mcdonell": {similarities[311]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "holden": {similarities[312]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "haslam": {similarities[313]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a soldier: {similarities[314]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "serviceman": {similarities[315]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "wounded": {similarities[316]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "soldiers": {similarities[317]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "guards": {similarities[318]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prisoner": {similarities[319]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "dead": {similarities[320]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "army": {similarities[321]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "captured": {similarities[322]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "man": {similarities[323]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "slain": {similarities[324]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "victim": {similarities[325]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "sergeant": {similarities[326]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "platoon": {similarities[327]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "escaped": {similarities[328]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a postman: {similarities[329]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "paperboy": {similarities[330]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "bagman": {similarities[331]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "milkman": {similarities[332]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "charlatan": {similarities[333]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "buffoon": {similarities[334]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "bloodsucker": {similarities[335]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "exclaims": {similarities[336]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "cujo": {similarities[337]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "curmudgeon": {similarities[338]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "glorified": {similarities[339]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "knucklehead": {similarities[340]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "drunkard": {similarities[341]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "scoundrel": {similarities[342]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "bookworm": {similarities[343]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a lawyer: {similarities[344]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "attorney": {similarities[345]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "judge": {similarities[346]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "colleague": {similarities[347]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "lawyers": {similarities[348]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "counsel": {similarities[349]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "testified": {similarities[350]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "attorneys": {similarities[351]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "justice": {similarities[352]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "asked": {similarities[353]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prosecutor": {similarities[354]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "defendant": {similarities[355]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "argued": {similarities[356]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "roberts": {similarities[357]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "pleaded": {similarities[358]}<br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be an entrepreneur: {similarities[359]}<br/>
              </div>
              <div class="blackFont">
              <br/>
              "brainchild": {similarities[360]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "pioneer": {similarities[361]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "philanthropist": {similarities[362]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "businessman": {similarities[363]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "millionaire": {similarities[364]}<br/>
              </div>
              <div class="blackFont">
              <br/>
              "restaurateur": {similarities[365]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "innovator": {similarities[366]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "co-founder": {similarities[367]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "multimillionaire": {similarities[368]}<br/>
              </div>
              <div class="blackFont">
              <br/>
              "founder": {similarities[369]}<br/>
              </div>
              <div class="blackFont">
              <br/>
              "businesswoman": {similarities[370]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "onetime": {similarities[371]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "consultant": {similarities[372]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "salesman": {similarities[373]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a consultant: {similarities[374]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "consulting": {similarities[375]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "specializes": {similarities[376]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "associate": {similarities[377]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "worked": {similarities[378]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "co": {similarities[379]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "managing": {similarities[380]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "expert": {similarities[381]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "consultants": {similarities[382]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "lobbyist": {similarities[383]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "specialist": {similarities[384]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "psychologist": {similarities[285]}<br/>
              </div>
              <div class="blackFont">
              <br/>
              "specializing": {similarities[386]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hired": {similarities[387]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "marketing": {similarities[388]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a banker: {similarities[389]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "stockbroker": {similarities[390]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "businessman": {similarities[391]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "accountant": {similarities[392]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "financier": {similarities[393]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "trader": {similarities[394]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "onetime": {similarities[395]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "salesman": {similarities[396]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "dealer": {similarities[397]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "entrepreneur": {similarities[398]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "restaurateur": {similarities[399]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "realtor": {similarities[400]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "colleague": {similarities[401]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "broker": {similarities[402]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "billionaire": {similarities[403]} <br/>
              </div>


              <div class="blackFont">
              <br/>
              You will be a manager: {similarities[404]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "owner": {similarities[405]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "boss": {similarities[406]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "managing": {similarities[407]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "assistant": {similarities[408]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "ceo": {similarities[409]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mike": {similarities[410]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hired": {similarities[411]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "kevin": {similarities[412]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "henderson": {similarities[413]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "ferguson": {similarities[414]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hughes": {similarities[415]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "executive": {similarities[416]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "keegan": {similarities[417]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "coach": {similarities[418]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a politician: {similarities[419]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "businessman": {similarities[420]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mp": {similarities[421]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "lawmaker": {similarities[422]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "liberal": {similarities[423]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "jurist": {similarities[424]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "parliamentarian": {similarities[425]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "citizen": {similarities[426]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "colleague": {similarities[427]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "conservative": {similarities[428]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "servant": {similarities[429]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "elected": {similarities[430]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "candidate": {similarities[431]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prominent": {similarities[432]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "reformer": {similarities[433]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a designer: {similarities[434]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "designers": {similarities[435]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "fashion": {similarities[436]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "klein": {similarities[437]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "stylist": {similarities[438]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "lauren": {similarities[439]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "artist": {similarities[440]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "photography": {similarities[441]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "designing": {similarities[442]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "designs": {similarities[443]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mcqueen": {similarities[444]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "shoe": {similarities[445]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "costume": {similarities[446]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "vintage": {similarities[447]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "chanel": {similarities[448]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You're gonna be a undertaker: {similarities[449]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "cena": {similarities[450]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "lawler": {similarities[451]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "despero": {similarities[452]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "bredahl": {similarities[453]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "summerslam": {similarities[454]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "zarathos": {similarities[455]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "mcmahon": {similarities[456]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "michaels": {similarities[457]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "pipping": {similarities[458]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "wrestled": {similarities[459]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "headlock": {similarities[460]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "wyrm": {similarities[461]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "cornerman": {similarities[462]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "volthoom": {similarities[463]} <br/>
              </div>

              <div class="blackFont">
              <br/>
              You will be a housekeeper: {similarities[464]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "hairdresser": {similarities[465]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "landlady": {similarities[466]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "babysitter": {similarities[467]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              fiance": {similarities[468]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "nanny": {similarities[469]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "fiancé": {similarities[470]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "fiancée": {similarities[471]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "schoolteacher": {similarities[472]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "governess": {similarities[473]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "co-worker": {similarities[474]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "prostitute": {similarities[475]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "barmaid": {similarities[476]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "bartender": {similarities[477]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "receptionist": {similarities[478]} <br/>
              </div>





              <div class="blackFont">
              <br/>
              "Anthroposophy": {similarities[479]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Mandaeans": {similarities[480]}
              <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Rosicrucians": {similarities[481]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Sun-Templar": {similarities[482]}
              <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Sufism": {similarities[483]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Kabbalah": {similarities[484]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Catholicism": {similarities[485]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Orthodox-Church": {similarities[486]}
              <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Protestantism": {similarities[487]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Free-Churches": {similarities[488]}
              <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Sunnites": {similarities[489]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Shia": {similarities[490]}
              <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Reform-Judaism": {similarities[491]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "conservative-Judaism": {similarities[492]}
              <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Orthodox Judaism": {similarities[493]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "Hinayana: {similarities[494]}
              <br/>
              </div>
              <div class="blackFont">
                  <br/>
                  "Mahayanar": {similarities[495]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Mandaeans": {similarities[496]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Chinese-Buddhism": {similarities[497]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Satsang-Movement": {similarities[498]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Sahaja-Yoga: {similarities[499]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Osho-Rajneesh-Movement": {similarities[500]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Krishna Consciousness: {similarities[501]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Parsees": {similarities[502]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Sikhism": {similarities[503]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Jainism": {similarities[504]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Confucianism": {similarities[505]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Mohism": {similarities[506]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Shintoism": {similarities[507]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Taoism": {similarities[508]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Animism": {similarities[509]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Paganism": {similarities[510]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Santeria": {similarities[511]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Shamanism": {similarities[512]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Rastafarian": {similarities[513]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Voodoo": {similarities[514]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Candomblé": {similarities[515]} <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Black-Order-of-the-Trapezoid": {similarities[516]}
                  <br/>
                  </div>
                  <div class="blackFont">
                  <br/>
                  "Church-of-Satan": {similarities[517]}
                  <br/>
                  </div>

        </div>  </React.Fragment>
  }

  render() {
    return (
      <div id="mirror-complete">
          {this.state.showSimilarities &&
            this.parseSimilarities()}
            <video className="fullscreen"id="animation"autoPlay muted loop>
            <source src="/img/sick.webm" type="video/webm"/>
          </video>
          <video className="fullscreen"id="animation"autoPlay muted overlay loop>
          <source src="/img/die.webm" type="video/webm"/>
        </video>
        </div>
      );
    }
}

export default Mirror;
