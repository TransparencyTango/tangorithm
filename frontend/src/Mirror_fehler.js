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
              You will be socialist: {similarities[0]}
              <br/>
              </div>
              <div class="blackFont">
            "socialists": {similarities[1]}
              <br/>
              </div>
              <div class="blackFont">
              "party": {similarities[2]}
              <br/>
              </div>
              <div class="blackFont">
              "centrist": {similarities[3]}
              <br/>
              </div>
              <div class="blackFont">
              "socialism": {similarities[4]} <br/>  </div>
                <div class="blackFont">
              <br/>
              "communist": {similarities[5]} <br/>  </div>
                <div class="blackFont">
              <br/>
              "leftist": {similarities[6]} <br/>  </div>
                <div class="blackFont">
              <br/>
              "communists": {similarities[7]} <br/>
              <br/>
              "socialist": {similarities[8]} <br/>  </div>
                <div class="blackFont">
              <br/>
              "left-wing": {similarities[9]} <br/>  </div>
                <div class="blackFont">
              <br/>
            "federalist" {similarities[10]} <br/>  </div>
                <div class="blackFont">
              <br/>
              "revolutionary": {similarities[11]} <br/>  </div>
                <div class="blackFont">
              <br/>
              "pasok": {similarities[12]} <br/>  </div>
                <div class="blackFont">
              <br/>
              "agrarian": {similarities[13]} <br/>  </div>
              <div class="blackFont">
            <br/>
            "reformer": {similarities[14]} <br/>  </div>

                <div class="blackFont">
              <br/>
              You will be liberal: {similarities[15]} <br/>  </div>
                <div class="blackFont">
              <br/>
              "liberals": {similarities[16]} <br/>  </div>
                <div class="blackFont">
              <br/>
              "centrist": {similarities[17]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "libertarian": {similarities[18]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "progressive": {similarities[19]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "party": {similarities[20]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "leaning": {similarities[21]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              "federalist": {similarities[22]} <br/>
              </div>
              <div class="blackFont">
              "labour": {similarities[23]}
            </div>
            <div class="blackFont">
              "opposed": {similarities[24]}
            </div>
            <div class="blackFont">
            <br/>
            "tory": {similarities[25]} <br/>
            </div>
            <div class="blackFont">
            <br/>
            "left-wing": {similarities[26]} <br/>
            </div>
            <div class="blackFont">
            <br/>
            "democratic": {similarities[27]} <br/>
            </div>
            <div class="blackFont">
            <br/>
            "politics": {similarities[28]} <br/>
            </div>
            <div class="blackFont">
            "influential": {similarities[29]}
          </div>

          <div class="blackFont">
        <br/>
        You will be conservative: {similarities[30]} <br/>  </div>
          <div class="blackFont">
        <br/>
        "conservatives": {similarities[31]} <br/>  </div>
          <div class="blackFont">
        <br/>
        "centrist": {similarities[32]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "democratic": {similarities[33]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "supporter": {similarities[34]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "opposed": {similarities[35]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "party": {similarities[36]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "leaning": {similarities[37]} <br/>
        </div>
        <div class="blackFont">
        "influential": {similarities[38]}
        </div>
        <div class="blackFont">
        <br/>
        "republican": {similarities[39]}
        </div>
        <div class="blackFont">
        <br/>
        "supported": {similarities[40]}
        <br/>
        </div>
        <div class="blackFont">
        <br/>
        "opinion": {similarities[41]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "outspoken": {similarities[42]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "tory": {similarities[43]} <br/>
        </div>
      <div class="blackFont">
      "populist": {similarities[44]}
    </div>

          <div class="blackFont">
            You're gonna be successfully: {similarities[45]}
          </div>
          <div class="blackFont">
          <br/>
          "eventually": {similarities[46]} <br/>
          </div>
          <div class="blackFont">
          <br/>
          "effectively": {similarities[47]} <br/>
          </div>
          <div class="blackFont">
          <br/>
          "managed": {similarities[48]} <br/>
          </div>
          <div class="blackFont">
          <br/>
          "subsequently": {similarities[49]} <br/>
          </div>
          <div class="blackFont">
          "ultimately": {similarities[50]}
        </div>
        <div class="blackFont">
          "aided": {similarities[51]}
        </div>
        <div class="blackFont">
        <br/>
        "pursued": {similarities[52]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "assisted": {similarities[53]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "quickly": {similarities[54]} <br/>
        </div>
        <div class="blackFont">
        <br/>
        "begun": {similarities[55]} <br/>
        </div>
        <div class="blackFont">
        "simultaneously": {similarities[56]}
      </div>
      <div class="blackFont">
        "entered": {similarities[57]}
      </div>
      <div class="blackFont">
      <br/>
      "determined": {similarities[58]} <br/>
      </div>
      <div class="blackFont">
      <br/>
      "soon": {similarities[59]} <br/>
      </div>

      <div class="blackFont">
      <br/>
      You will be a looser: {similarities[60]} <br/>
      </div>
      <div class="blackFont">
      <br/>
      "restrictive": {similarities[61]} <br/>
      </div>
      <div class="blackFont">
      "loosening": {similarities[62]}
    </div>
    <div class="blackFont">
      "inflexible": {similarities[63]}
    </div>
    <div class="blackFont">
    <br/>
    "polices": {similarities[64]} <br/>
    </div>
    <div class="blackFont">
    <br/>
    "tighter": {similarities[65]} <br/>
    </div>
    <div class="blackFont">
    <br/>
    "dictated": {similarities[66]} <br/>
    </div>
    <div class="blackFont">
    <br/>
    "rigid": {similarities[67]} <br/>
    </div>
    <div class="blackFont">
    "conforming": {similarities[68]}
  </div>
  <div class="blackFont">
    "dictating": {similarities[69]}
  </div>
  <div class="blackFont">
  <br/>
  "rigidly": {similarities[70]} <br/>
  </div>
  <div class="blackFont">
  <br/>
  "instituting": {similarities[71]} <br/>
  </div>
  <div class="blackFont">
  <br/>
  "cumbersome": {similarities[72]} <br/>
  </div>
  <div class="blackFont">
  <br/>
  "constrained": {similarities[73]} <br/>
  </div>
  <div class="blackFont">
  "burdensome": {similarities[74]}
</div>

<div class="blackFont">
  You will be loved: {similarities[75]}
</div>
<div class="blackFont">
<br/>
"remember": {similarities[76]} <br/>
</div>
<div class="blackFont">
<br/>
"friends": {similarities[77]} <br/>
</div>
<div class="blackFont">
<br/>
"wonder": {similarities[78]} <br/>
</div>
<div class="blackFont">
<br/>
"remembered": {similarities[79]} <br/>
</div>
<div class="blackFont">
"loves": {similarities[80]}
</div>
<div class="blackFont">
"imagine": {similarities[81]}
</div>
  <div class="blackFont">
  <br/>
  "liked": {similarities[82]} <br/>
  </div>
  <div class="blackFont">
  <br/>
  "beloved": {similarities[83]} <br/>
  </div>
  <div class="blackFont">
  <br/>
  "remembers": {similarities[84]} <br/>
  </div>
  <div class="blackFont">
  <br/>
  "knew": {similarities[85]} <br/>
  </div>
  <div class="blackFont">
  "tell": {similarities[86]}
</div>
<div class="blackFont">
  "wonders": {similarities[87]}
</div>
<div class="blackFont">
<br/>
"reminds": {similarities[88]} <br/>
</div>
<div class="blackFont">
<br/>
"dad": {similarities[89]} <br/>
</div>

<div class="blackFont">
<br/>
You will be hated: {similarities[90]} <br/>
</div>
<div class="blackFont">
<br/>
"despised": {similarities[91]} <br/>
</div>
<div class="blackFont">
"despise": {similarities[92]}
</div>
<div class="blackFont">
"betrayed": {similarities[93]}
</div>
<div class="blackFont">
<br/>
"loathed": {similarities[94]} <br/>
</div>
<div class="blackFont">
<br/>
"hates": {similarities[95]} <br/>
</div>
<div class="blackFont">
<br/>
"obsessed": {similarities[96]} <br/>
</div>
<div class="blackFont">
<br/>
"evidently": {similarities[97]} <br/>
</div>
<div class="blackFont">
"cursed": {similarities[98]}
</div>
<div class="blackFont">
"theirs": {similarities[100]}
</div>
<div class="blackFont">
<br/>
"scorned": {similarities[101]} <br/>
</div>
<div class="blackFont">
<br/>
"dreamed": {similarities[102]} <br/>
</div>
<div class="blackFont">
<br/>
"ironically": {similarities[103]} <br/>
</div>
<div class="blackFont">
<br/>
"adored": {similarities[104]} <br/>
</div>
<div class="blackFont">
"dislikes": {similarities[105]}
</div>

<div class="blackFont">
<br/>
You will be a criminal: {similarities[106]} <br/>
</div>
<div class="blackFont">
<br/>
"crime": {similarities[107]} <br/>
</div>
<div class="blackFont">
<br/>
"crimes": {similarities[108]} <br/>
</div>
<div class="blackFont">
<br/>
"charged": {similarities[109]} <br/>
</div>
<div class="blackFont">
<br/>
"prosecution": {similarities[110]} <br/>
</div>
<div class="blackFont">
"charges": {similarities[111]}
</div>
<div class="blackFont">
"alleged": {similarities[112]}
</div>
<div class="blackFont">
<br/>
"investigating": {similarities[113]} <br/>
</div>
<div class="blackFont">
<br/>
"prosecuting": {similarities[114]} <br/>
</div>
<div class="blackFont">
<br/>
"guilty": {similarities[115]} <br/>
</div>
<div class="blackFont">
<br/>
"conspiracy": {similarities[116]} <br/>
</div>
<div class="blackFont">
"case": {similarities[117]}
</div>
<div class="blackFont">
"prosecuted": {similarities[118]}
</div>
<div class="blackFont">
<br/>
"investigate": {similarities[119]} <br/>
</div>
<div class="blackFont">
<br/>
"involvement": {similarities[120]} <br/>
</div>


<div class="blackFont">
<br/>
You will be a victim: {similarities[121]} <br/>
</div>
<div class="blackFont">
"death": {similarities[122]}
</div>
<div class="blackFont">
"killer": {similarities[123]}
</div>
<div class="blackFont">
<br/>
"finds": {similarities[124]} <br/>
</div>
<div class="blackFont">
<br/>
"witness": {similarities[125]} <br/>
</div>
<div class="blackFont">
<br/>
"child": {similarities[126]} <br/>
</div>
<div class="blackFont">
<br/>
"murder": {similarities[127]} <br/>
</div>
<div class="blackFont">
"escaped": {similarities[128]}
</div>
<div class="blackFont">
"man": {similarities[129]}
</div>
<div class="blackFont">
<br/>
"woman": {similarities[130]} <br/>
</div>
<div class="blackFont">
<br/>
"suspect": {similarities[131]} <br/>
</div>
<div class="blackFont">
<br/>
"escapes": {similarities[132]} <br/>
</div>
<div class="blackFont">
<br/>
"survived": {similarities[133]} <br/>
</div>
<div class="blackFont">
"another": {similarities[134]}
</div>
<div class="blackFont">
"innocent": {similarities[135]}
</div>


<div class="blackFont">
<br/>
You will be suicidal: {similarities[136]} <br/>
</div>
<div class="blackFont">
<br/>
"ideation": {similarities[137]} <br/>
</div>
<div class="blackFont">
<br/>
"homicidal": {similarities[138]} <br/>
</div>
<div class="blackFont">
"impulsive": {similarities[139]}
</div>
<div class="blackFont">
"tendencies": {similarities[140]}
</div>
<div class="blackFont">
<br/>
"psychotic": {similarities[141]} <br/>
</div>
<div class="blackFont">
<br/>
"antisocial": {similarities[142]} <br/>
</div>
<div class="blackFont">
<br/>
"sociopathic": {similarities[143]} <br/>
</div>
<div class="blackFont">
<br/>
"delusional": {similarities[144]} <br/>
</div>
<div class="blackFont">
"self-destructive": {similarities[145]}
</div>
<div class="blackFont">
"paranoid": {similarities[146]}
</div>
<div class="blackFont">
<br/>
"impetuous": {similarities[147]} <br/>
</div>
<div class="blackFont">
<br/>
"demented": {similarities[148]} <br/>
</div>
<div class="blackFont">
<br/>
"psychopath": {similarities[149]} <br/>
</div>
<div class="blackFont">
<br/>
"narcissistic": {similarities[150]} <br/>
</div>

<div class="blackFont">
You will be a hostess: {similarities[151]}
</div>
<div class="blackFont">
"waitress": {similarities[152]}
</div>
<div class="blackFont">
<br/>
"hairdresser": {similarities[153]} <br/>
</div>
<div class="blackFont">
<br/>
"diner": {similarities[154]} <br/>
</div>
<div class="blackFont">
<br/>
"bartender": {similarities[155]} <br/>
</div>
<div class="blackFont">
<br/>
"showbiz": {similarities[156]} <br/>
</div>
<div class="blackFont">
"caterer": {similarities[157]}
</div>
<div class="blackFont">
"waiter": {similarities[158]}
</div>
<div class="blackFont">
<br/>
"emcee": {similarities[159]} <br/>
</div>
<div class="blackFont">
<br/>
"barmaid": {similarities[160]} <br/>
</div>
<div class="blackFont">
<br/>
"catered": {similarities[161]} <br/>
</div>
<div class="blackFont">
<br/>
"saucy": {similarities[162]} <br/>
</div>
<div class="blackFont">
"swanky": {similarities[163]}
</div>
<div class="blackFont">
"restaurateur": {similarities[164]}
</div>
<div class="blackFont">
<br/>
"twinkies": {similarities[165]} <br/>
</div>

<div class="blackFont">
<br/>
You will be a fireman: {similarities[166]} <br/>
</div>
<div class="blackFont">
<br/>
"firefighter": {similarities[167]} <br/>
</div>
<div class="blackFont">
<br/>
"janitor": {similarities[168]} <br/>
</div>
<div class="blackFont">
"driscoll": {similarities[169]}
</div>
<div class="blackFont">
"blackmailer": {similarities[170]}
</div>
<div class="blackFont">
<br/>
"crewman": {similarities[171]} <br/>
</div>
<div class="blackFont">
<br/>
"medic": {similarities[172]} <br/>
</div>
<div class="blackFont">
<br/>
"hires": {similarities[173]} <br/>
</div>
<div class="blackFont">
<br/>
"mechanic": {similarities[174]} <br/>
</div>
<div class="blackFont">
"chauffeur": {similarities[175]}
</div>
<div class="blackFont">
"cabbie": {similarities[176]}
</div>
<div class="blackFont">
<br/>
"watchman": {similarities[177]} <br/>
</div>
<div class="blackFont">
<br/>
"paramedic": {similarities[178]} <br/>
</div>
<div class="blackFont">
<br/>
"vetter": {similarities[179]} <br/>
</div>
<div class="blackFont">
<br/>
"gunning": {similarities[180]} <br/>
</div>

<div class="blackFont">
You will be nurse: {similarities[181]}
</div>
<div class="blackFont">
"nurses": {similarities[182]}
</div>
<div class="blackFont">
<br/>
"pediatrician": {similarities[183]} <br/>
</div>
<div class="blackFont">
<br/>
"counselor": {similarities[184]} <br/>
</div>
<div class="blackFont">
<br/>
"therapist": {similarities[185]} <br/>
</div>
<div class="blackFont">
<br/>
"pregnant": {similarities[186]} <br/>
</div>
<div class="blackFont">
"nursing": {similarities[187]}
</div>
<div class="blackFont">
"surgeon": {similarities[188]}
</div>
<div class="blackFont">
<br/>
"paramedic": {similarities[189]} <br/>
</div>
<div class="blackFont">
<br/>
"physician": {similarities[190]} <br/>
</div>
<div class="blackFont">
<br/>
"midwife": {similarities[191]} <br/>
</div>
<div class="blackFont">
<br/>
"psychiatrist": {similarities[192]} <br/>
</div>
<div class="blackFont">
"toddler": {similarities[193]}
</div>
<div class="blackFont">
"teacher": {similarities[194]}
</div>
<div class="blackFont">
"patient": {similarities[195]}
</div>

<div class="blackFont">
<br/>
You will be a waitress: {similarities[196]} <br/>
</div>
<div class="blackFont">
<br/>
"bartender": {similarities[197]} <br/>
</div>
<div class="blackFont">
"waiter": {similarities[198]}
</div>
<div class="blackFont">
"hairdresser": {similarities[199]}
</div>
<div class="blackFont">
<br/>
"housekeeper": {similarities[200]} <br/>
</div>
<div class="blackFont">
<br/>
"homemaker": {similarities[201]} <br/>
</div>
<div class="blackFont">
<br/>
"receptionist": {similarities[202]} <br/>
</div>
<div class="blackFont">
<br/>
"diner": {similarities[203]} <br/>
</div>
<div class="blackFont">
"housewife": {similarities[204]}
</div>
<div class="blackFont">
"schoolteacher": {similarities[205]}
</div>
<div class="blackFont">
<br/>
"hostess": {similarities[206]} <br/>
</div>
<div class="blackFont">
<br/>
"prostitute": {similarities[207]} <br/>
</div>
<div class="blackFont">
<br/>
"mom": {similarities[208]} <br/>
</div>
<div class="blackFont">
<br/>
"janitor": {similarities[209]} <br/>
</div>
<div class="blackFont">
"fiance": {similarities[210]}
</div>

<div class="blackFont">
You're gonna be a policeman: {similarities[211]}
</div>
<div class="blackFont">
<br/>
"soldier": {similarities[212]} <br/>
</div>
<div class="blackFont">
<br/>
"gunman": {similarities[213]} <br/>
</div>
<div class="blackFont">
<br/>
"fatally": {similarities[214]} <br/>
</div>
<div class="blackFont">
<br/>
"policemen": {similarities[215]} <br/>
</div>
<div class="blackFont">
"assailant": {similarities[216]}
</div>
<div class="blackFont">
"gunned": {similarities[217]}
</div>
<div class="blackFont">
<br/>
"wounding": {similarities[218]} <br/>
</div>
<div class="blackFont">
<br/>
"attacker": {similarities[219]} <br/>
</div>
<div class="blackFont">
<br/>
"killing": {similarities[220]} <br/>
</div>
<div class="blackFont">
<br/>
"assailants": {similarities[221]} <br/>
</div>
<div class="blackFont">
"injuring": {similarities[222]}
</div>
<div class="blackFont">
"guards": {similarities[223]}
</div>
<div class="blackFont">
<br/>
"attackers": {similarities[224]} <br/>
</div>
<div class="blackFont">
<br/>
"police": {similarities[225]} <br/>
</div>

<div class="blackFont">
You will be a nursery: {similarities[226]}
</div>
<div class="blackFont">
<br/>
"nurseries": {similarities[227]} <br/>
</div>
<div class="blackFont">
<br/>
"cottage": {similarities[228]} <br/>
</div>
<div class="blackFont">
<br/>
"orchard": {similarities[229]} <br/>
</div>
<div class="blackFont">
<br/>
"barn": {similarities[230]} <br/>
</div>
<div class="blackFont">
"sunnyside": {similarities[231]}
</div>
<div class="blackFont">
"vine": {similarities[232]}
</div>
<div class="blackFont">
<br/>
"playground": {similarities[233]} <br/>
</div>
<div class="blackFont">
<br/>
"ivy": {similarities[234]} <br/>
</div>
<div class="blackFont">
<br/>
"elms": {similarities[235]} <br/>
</div>
<div class="blackFont">
<br/>
"sheds": {similarities[236]} <br/>
</div>
<div class="blackFont">
"gardening": {similarities[237]}
</div>
<div class="blackFont">
"heronswood": {similarities[238]}
</div>
<div class="blackFont">
<br/>
"tending": {similarities[239]} <br/>
</div>
<div class="blackFont">
<br/>
"farm": {similarities[240]} <br/>
</div>


<div class="blackFont">
<br/>
You will be a judge: {similarities[241]} <br/>
</div>
<div class="blackFont">
"court": {similarities[242]}
</div>
<div class="blackFont">
"attorney": {similarities[243]}
</div>
<div class="blackFont">
<br/>
"prosecutor": {similarities[244]} <br/>
</div>
<div class="blackFont">
<br/>
"appeals": {similarities[245]} <br/>
</div>
<div class="blackFont">
<br/>
"lawyer": {similarities[246]} <br/>
</div>
<div class="blackFont">
<br/>
"justice": {similarities[247]} <br/>
</div>
<div class="blackFont">
"jury",: {similarities[248]}
</div>
<div class="blackFont">
"prosecution": {similarities[249]}
</div>
<div class="blackFont">
<br/>
"judges": {similarities[250]} <br/>
</div>
<div class="blackFont">
<br/>
"magistrate": {similarities[251]} <br/>
</div>
<div class="blackFont">
defendant": {similarities[252]}
</div>
<div class="blackFont">
"supreme": {similarities[253]}
</div>
<div class="blackFont">
<br/>
"hearing": {similarities[254]} <br/>
</div>
<div class="blackFont">
<br/>
"case": {similarities[255]} <br/>
</div>

<div class="blackFont">
<br/>
You will be a professor: {similarities[256]} <br/>
</div>
<div class="blackFont">
<br/>
"harvard": {similarities[257]} <br/>
</div>
<div class="blackFont">
"associate": {similarities[258]}
</div>
<div class="blackFont">
"sociology": {similarities[259]}
</div>
<div class="blackFont">
<br/>
"emeritus": {similarities[28]} <br/>
</div>
<div class="blackFont">
<br/>
"emeritus": {similarities[260]} <br/>
</div>
<div class="blackFont">
<br/>
"psychologist": {similarities[261]} <br/>
</div>
<div class="blackFont">
"yale": {similarities[262]}
</div>
<div class="blackFont">
"researcher": {similarities[263]}
</div>
<div class="blackFont">
<br/>
"lecturer": {similarities[264]} <br/>
</div>
<div class="blackFont">
<br/>
"scientist": {similarities[265]} <br/>
</div>
<div class="blackFont">
<br/>
"sociologist": {similarities[266]} <br/>
</div>
<div class="blackFont">
<br/>
"scholar": {similarities[267]} <br/>
</div>
<div class="blackFont">
"studied": {similarities[268]}
</div>
<div class="blackFont">
"university": {similarities[269]}
</div>
<div class="blackFont">
<br/>
"economics": {similarities[270]} <br/>
</div>

<div class="blackFont">
You will be a teacher: {similarities[271]}
</div>
<div class="blackFont">
"student": {similarities[272]}
</div>
<div class="blackFont">
<br/>
"taught": {similarities[273]} <br/>
</div>
<div class="blackFont">
<br/>
"teaches": {similarities[274]} <br/>
</div>
<div class="blackFont">
<br/>
"teaching": {similarities[275]} <br/>
</div>
<div class="blackFont">
<br/>
"graduate": {similarities[276]} <br/>
</div>
<div class="blackFont">
"teachers": {similarities[277]}
</div>
<div class="blackFont">
"classmate": {similarities[278]}
</div>
<div class="blackFont">
<br/>
"tutor": {similarities[279]} <br/>
</div>
<div class="blackFont">
<br/>
"schoolteacher": {similarities[280]} <br/>
</div>
<div class="blackFont">
"counselor": {similarities[281]}
</div>
<div class="blackFont">
"colleague": {similarities[282]}
</div>
<div class="blackFont">
<br/>
"master": {similarities[283]} <br/>
</div>
<div class="blackFont">
<br/>
"school": {similarities[284]} <br/>
</div>
<div class="blackFont">
<br/>
"mentor": {similarities[285]} <br/>
</div>

<div class="blackFont">
<br/>
You will be a plumber: {similarities[286]} <br/>
</div>
<div class="blackFont">
"janitor": {similarities[287]}
</div>
<div class="blackFont">
"electrician": {similarities[288]}
</div>
<div class="blackFont">
<br/>
"tradesman": {similarities[289]} <br/>
</div>
<div class="blackFont">
<br/>
"roofer": {similarities[290]} <br/>
</div>
<div class="blackFont">
"newspaperman": {similarities[291]}
</div>
<div class="blackFont">
"landscaper": {similarities[292]}
</div>
<div class="blackFont">
<br/>
"cabdriver": {similarities[293]} <br/>
</div>
<div class="blackFont">
<br/>
"welder": {similarities[294]} <br/>
</div>
<div class="blackFont">
<br/>
"bricklayer": {similarities[295]} <br/>
</div>
<div class="blackFont">
<br/>
"curmudgeon": {similarities[296]} <br/>
</div>
<div class="blackFont">
"tinkerer": {similarities[297]}
</div>
<div class="blackFont">
"layabout": {similarities[298]}
</div>
<div class="blackFont">
<br/>
"woodworker": {similarities[299]} <br/>
</div>
<div class="blackFont">
<br/>
"storekeeper": {similarities[300]} <br/>
</div>

<div class="blackFont">
You're gonna be a technician: {similarities[301]}
</div>
<div class="blackFont">
<br/>
"technologist": {similarities[302]} <br/>
</div>
<div class="blackFont">
<br/>
"mechanic": {similarities[303]} <br/>
</div>
<div class="blackFont">
<br/>
"engineer": {similarities[304]} <br/>
</div>
<div class="blackFont">
<br/>
"technicians": {similarities[305]} <br/>
</div>
<div class="blackFont">
"dentist": {similarities[306]}
</div>
<div class="blackFont">
"paramedic": {similarities[307]}
</div>
<div class="blackFont">
<br/>
"orthopedic": {similarities[308]} <br/>
</div>
<div class="blackFont">
<br/>
"instructor": {similarities[309]} <br/>
</div>
<div class="blackFont">
"lab": {similarities[310]}
</div>
<div class="blackFont">
"specialist": {similarities[311]}
</div>
<div class="blackFont">
<br/>
"internist": {similarities[312]} <br/>
</div>
<div class="blackFont">
<br/>
"programmer": {similarities[313]} <br/>
</div>
<div class="blackFont">
<br/>
"contractor": {similarities[314]} <br/>
</div>
<div class="blackFont">
<br/>
"welder": {similarities[315]} <br/>
</div>

<div class="blackFont">
You will be a roofer: {similarities[316]}
</div>
<div class="blackFont">
"landscaper": {similarities[3217]}
</div>
<div class="blackFont">
<br/>
"softy": {similarities[318]} <br/>
</div>
<div class="blackFont">
<br/>
"chiropractor": {similarities[319]} <br/>
</div>
<div class="blackFont">
"manicurist": {similarities[320]}
</div>
<div class="blackFont">
"janitor": {similarities[321]}
</div>
<div class="blackFont">
<br/>
"doddering": {similarities[322]} <br/>
</div>
<div class="blackFont">
<br/>
"podiatrist": {similarities[323]} <br/>
</div>
<div class="blackFont">
<br/>
"crackhead": {similarities[324]} <br/>
</div>
<div class="blackFont">
<br/>
"ninny": {similarities[325]} <br/>
<div class="blackFont">
"cowhand": {similarities[326]}
</div>
<div class="blackFont">
<br/>
"plasterer": {similarities[327]} <br/>
</div>
<div class="blackFont">
<br/>
"tinkerer": {similarities[328]} <br/>
</div>
<div class="blackFont">
"locksmith": {similarities[329]}
</div>
<div class="blackFont">
"welder": {similarities[330]}
</div>

<div class="blackFont">
<br/>
You will be a locomotive driver: {similarities[331]} <br/>
</div>
<div class="blackFont">
<br/>
"driver": {similarities[332]} <br/>
</div>
<div class="blackFont">
<br/>
"cab": {similarities[333]} <br/>
</div>
<div class="blackFont">
<br/>
"mechanic": {similarities[334]} <br/>
</div>
<div class="blackFont">
"car": {similarities[335]}
</div>
<div class="blackFont">
"tractor": {similarities[336]}
</div>
<div class="blackFont">
<br/>
"driving": {similarities[337]} <br/>
</div>
<div class="blackFont">
<br/>
"bicycle": {similarities[338]} <br/>
</div>
<div class="blackFont">
"lorry": {similarities[339]}
</div>
<div class="blackFont">
"vehicle": {similarities[340]}
</div>
<div class="blackFont">
<br/>
"truck": {similarities[341]} <br/>
</div>
<div class="blackFont">
<br/>
"powered": {similarities[342]} <br/>
</div>
<div class="blackFont">
<br/>
"wheel": {similarities[343]} <br/>
</div>
<div class="blackFont">
<br/>
"wagon": {similarities[344]} <br/>
</div>
<div class="blackFont">
"carriage": {similarities[345]}
</div>

<div class="blackFont">
You're gonna be a forester: {similarities[346]}
</div>
<div class="blackFont">
<br/>
"moulton": {similarities[347]} <br/>
</div>
<div class="blackFont">
<br/>
"esmond": {similarities[348]} <br/>
</div>
<div class="blackFont">
"gage": {similarities[349]}
</div>
<div class="blackFont">
"atwood": {similarities[350]}
</div>
<div class="blackFont">
<br/>
"forsythe": {similarities[351]} <br/>
</div>
<div class="blackFont">
<br/>
"huck": {similarities[352]} <br/>
</div>
<div class="blackFont">
<br/>
"stoddard": {similarities[353]} <br/>
</div>
<div class="blackFont">
<br/>
"mundy": {similarities[354]} <br/>
</div>
<div class="blackFont">
"parson": {similarities[355]}
</div>
<div class="blackFont">
"oly-2004-box": {similarities[356]}
</div>
<div class="blackFont">
<br/>
"nell": {similarities[357]} <br/>
</div>
<div class="blackFont">
<br/>
"mcdonell": {similarities[358]} <br/>
</div>
<div class="blackFont">
"holden": {similarities[359]}
</div>
<div class="blackFont">
"haslam": {similarities[360]}
</div>

<div class="blackFont">
<br/>
You will be a soldier: {similarities[361]} <br/>
</div>
<div class="blackFont">
<br/>
"serviceman": {similarities[362]} <br/>
</div>
<div class="blackFont">
<br/>
"wounded": {similarities[363]} <br/>
</div>
<div class="blackFont">
<br/>
"soldiers": {similarities[364]} <br/>
</div>
<div class="blackFont">
"guards": {similarities[365]}
</div>
<div class="blackFont">
"prisoner": {similarities[366]}
</div>
<div class="blackFont">
<br/>
"dead": {similarities[367]} <br/>
</div>
<div class="blackFont">
<br/>
"army": {similarities[368]} <br/>
</div>
<div class="blackFont">
"captured": {similarities[369]}
</div>
<div class="blackFont">
"man": {similarities[370]}
</div>
<div class="blackFont">
<br/>
"slain": {similarities[371]} <br/>
</div>
<div class="blackFont">
<br/>
"victim": {similarities[372]} <br/>
</div>
<div class="blackFont">
<br/>
"sergeant": {similarities[373]} <br/>
</div>
<div class="blackFont">
<br/>
"platoon": {similarities[374]} <br/>
</div>
<div class="blackFont">
"escaped": {similarities[375]}
</div>

<div class="blackFont">
You will be a postman: {similarities[376]}
</div>
<div class="blackFont">
<br/>
"paperboy": {similarities[377]} <br/>
</div>
<div class="blackFont">
<br/>
"bagman": {similarities[378]} <br/>
</div>
<div class="blackFont">
"milkman": {similarities[379]}
</div>
<div class="blackFont">
"charlatan": {similarities[380]}
</div>
<div class="blackFont">
<br/>
"buffoon": {similarities[381]} <br/>
</div>
<div class="blackFont">
<br/>
"bloodsucker": {similarities[382]} <br/>
</div>
<div class="blackFont">
<br/>
"exclaims": {similarities[383]} <br/>
</div>
<div class="blackFont">
<br/>
"cujo": {similarities[384]} <br/>
</div>
<div class="blackFont">
"curmudgeon": {similarities[385]}
</div>
<div class="blackFont">
"glorified": {similarities[386]}
</div>
<div class="blackFont">
<br/>
"knucklehead": {similarities[387]} <br/>
</div>
<div class="blackFont">
<br/>
"drunkard": {similarities[388]} <br/>
</div>
<div class="blackFont">
"scoundrel": {similarities[389]}
</div>
<div class="blackFont">
"bookworm": {similarities[390]}
</div>

<div class="blackFont">
<br/>
You will be a lawyer: {similarities[391]} <br/>
</div>
<div class="blackFont">
<br/>
"attorney": {similarities[392]} <br/>
</div>
<div class="blackFont">
<br/>
"judge": {similarities[393]} <br/>
</div>
<div class="blackFont">
<br/>
"colleague": {similarities[394]} <br/>
</div>
<div class="blackFont">
"lawyers": {similarities[395]}
</div>
<div class="blackFont">
"counsel": {similarities[396]}
</div>
<div class="blackFont">
<br/>
"testified": {similarities[397]} <br/>
</div>
<div class="blackFont">
<br/>
"attorneys": {similarities[398]} <br/>
</div>
<div class="blackFont">
"justice": {similarities[399]}
</div>
<div class="blackFont">
"asked": {similarities[400]}
</div>
<div class="blackFont">
<br/>
"prosecutor": {similarities[401]} <br/>
</div>
<div class="blackFont">
<br/>
"defendant": {similarities[402]} <br/>
</div>
<div class="blackFont">
<br/>
"argued": {similarities[403]} <br/>
</div>
<div class="blackFont">
<br/>
"roberts": {similarities[404]} <br/>
</div>
<div class="blackFont">
"pleaded": {similarities[405]}
</div>

<div class="blackFont">
You will be an entrepreneur: {similarities[406]}
</div>
<div class="blackFont">
<br/>
"brainchild": {similarities[407]} <br/>
</div>
<div class="blackFont">
<br/>
"pioneer": {similarities[408]} <br/>
</div>
<div class="blackFont">
<br/>
"philanthropist": {similarities[409]} <br/>
</div>
<div class="blackFont">
<br/>
"businessman": {similarities[410]} <br/>
</div>
<div class="blackFont">
"millionaire": {similarities[411]}
</div>
<div class="blackFont">
"restaurateur": {similarities[412]}
</div>
<div class="blackFont">
<br/>
"innovator": {similarities[413]} <br/>
</div>
<div class="blackFont">
<br/>
"co-founder": {similarities[414]} <br/>
</div>
<div class="blackFont">
"multimillionaire": {similarities[415]}
</div>
<div class="blackFont">
"founder": {similarities[416]}
</div>
<div class="blackFont">
<br/>
"businesswoman": {similarities[417]} <br/>
</div>
<div class="blackFont">
<br/>
"onetime": {similarities[418]} <br/>
</div>
<div class="blackFont">
<br/>
"consultant": {similarities[419]} <br/>
</div>
<div class="blackFont">
<br/>
"salesman": {similarities[420]} <br/>
</div>

<div class="blackFont">
You will be a consultant: {similarities[421]}
</div>
<div class="blackFont">
"consulting": {similarities[422]}
</div>
<div class="blackFont">
<br/>
"specializes": {similarities[423]} <br/>
</div>
<div class="blackFont">
<br/>
"associate": {similarities[424]} <br/>
</div>
<div class="blackFont">
<br/>
"worked": {similarities[425]} <br/>
</div>
<div class="blackFont">
<br/>
"co": {similarities[426]} <br/>
</div>
<div class="blackFont">
"managing": {similarities[427]}
</div>
<div class="blackFont">
"expert": {similarities[428]}
</div>
<div class="blackFont">
<br/>
"consultants": {similarities[429]} <br/>
</div>
<div class="blackFont">
<br/>
"lobbyist": {similarities[430]} <br/>
</div>
<div class="blackFont">
"specialist": {similarities[431]}
</div>
<div class="blackFont">
"psychologist": {similarities[432]}
</div>
<div class="blackFont">
<br/>
"specializing": {similarities[433]} <br/>
</div>
<div class="blackFont">
<br/>
"hired": {similarities[434]} <br/>
</div>
<div class="blackFont">
<br/>
"marketing": {similarities[435]} <br/>
</div>

<div class="blackFont">
<br/>
You will be a banker: {similarities[436]} <br/>
</div>
<div class="blackFont">
"stockbroker": {similarities[437]}
</div>
<div class="blackFont">
"businessman": {similarities[438]}
</div>
<div class="blackFont">
<br/>
"accountant": {similarities[439]} <br/>
</div>
<div class="blackFont">
<br/>
"financier": {similarities[440]} <br/>
</div>
<div class="blackFont">
<br/>
"trader": {similarities[441]} <br/>
</div>
<div class="blackFont">
<br/>
"onetime": {similarities[442]} <br/>
</div>
<div class="blackFont">
"salesman": {similarities[443]}
</div>
<div class="blackFont">
"dealer": {similarities[444]}
</div>
<div class="blackFont">
<br/>
"entrepreneur": {similarities[445]} <br/>
</div>
<div class="blackFont">
<br/>
"restaurateur": {similarities[446]} <br/>
</div>
<div class="blackFont">
"realtor": {similarities[447]}
</div>
<div class="blackFont">
"colleague": {similarities[448]}
</div>
<div class="blackFont">
<br/>
"broker": {similarities[449]} <br/>
</div>
<div class="blackFont">
<br/>
"billionaire": {similarities[450]} <br/>
</div>


<div class="blackFont">
<br/>
You will be a manager: {similarities[451]} <br/>
</div>
<div class="blackFont">
"owner": {similarities[452]}
</div>
<div class="blackFont">
"boss": {similarities[453]}
</div>
<div class="blackFont">
<br/>
"managing": {similarities[454]} <br/>
</div>
<div class="blackFont">
<br/>
"assistant": {similarities[455]} <br/>
</div>
<div class="blackFont">
<br/>
"ceo": {similarities[456]} <br/>
</div>
<div class="blackFont">
<br/>
"mike": {similarities[457]} <br/>
</div>
<div class="blackFont">
"hired": {similarities[458]}
</div>
<div class="blackFont">
"kevin": {similarities[459]}
</div>
<div class="blackFont">
<br/>
"henderson": {similarities[460]} <br/>
</div>
<div class="blackFont">
<br/>
"ferguson": {similarities[461]} <br/>
</div>
<div class="blackFont">
"hughes": {similarities[462]}
</div>
<div class="blackFont">
"executive": {similarities[463]}
</div>
<div class="blackFont">
<br/>
"keegan": {similarities[464]} <br/>
</div>
<div class="blackFont">
<br/>
"coach": {similarities[465]} <br/>
</div>

<div class="blackFont">
<br/>
You will be a politician: {similarities[466]} <br/>
</div>
<div class="blackFont">
<br/>
"businessman": {similarities[467]} <br/>
</div>
<div class="blackFont">
<br/>
"mp": {similarities[468]} <br/>
</div>
<div class="blackFont">
"lawmaker": {similarities[469]}
</div>
<div class="blackFont">
"liberal": {similarities[470]}
</div>
<div class="blackFont">
<br/>
"jurist": {similarities[471]} <br/>
</div>
<div class="blackFont">
<br/>
"parliamentarian": {similarities[472]} <br/>
</div>
<div class="blackFont">
<br/>
"citizen": {similarities[473]} <br/>
</div>
<div class="blackFont">
<br/>
"colleague": {similarities[474]} <br/>
</div>
<div class="blackFont">
"conservative": {similarities[475]}
</div>
<div class="blackFont">
"servant": {similarities[476]}
</div>
<div class="blackFont">
<br/>
"elected": {similarities[477]} <br/>
</div>
<div class="blackFont">
<br/>
"candidate": {similarities[478]} <br/>
</div>
<div class="blackFont">
"prominent": {similarities[479]}
</div>
<div class="blackFont">
"reformer": {similarities[480]}
</div>

<div class="blackFont">
<br/>
You will be a designer: {similarities[481]} <br/>
</div>
<div class="blackFont">
<br/>
"designers": {similarities[482]} <br/>
</div>
<div class="blackFont">
<br/>
"fashion": {similarities[483]} <br/>
</div>
<div class="blackFont">
<br/>
"klein": {similarities[484]} <br/>
</div>
<div class="blackFont">
"stylist": {similarities[485]}
</div>
<div class="blackFont">
"lauren": {similarities[486]}
</div>
<div class="blackFont">
<br/>
"artist": {similarities[487]} <br/>
</div>
<div class="blackFont">
<br/>
"photography": {similarities[488]} <br/>
</div>
<div class="blackFont">
<br/>
"designing": {similarities[489]} <br/>
</div>
<div class="blackFont">
<br/>
"designs": {similarities[490]} <br/>
</div>
<div class="blackFont">
"mcqueen": {similarities[491]}
</div>
<div class="blackFont">
"shoe": {similarities[492]}
</div>
<div class="blackFont">
<br/>
"costume": {similarities[493]} <br/>
</div>
<div class="blackFont">
<br/>
"vintage": {similarities[494]} <br/>
</div>
<div class="blackFont">
"chanel": {similarities[495]}
</div>

<div class="blackFont">
You're gonna be a undertaker: {similarities[496]}
</div>
<div class="blackFont">
<br/>
"cena": {similarities[497]} <br/>
</div>
<div class="blackFont">
<br/>
"lawler": {similarities[498]} <br/>
</div>
<div class="blackFont">
<br/>
"despero": {similarities[499]} <br/>
</div>
<div class="blackFont">
<br/>
"bredahl": {similarities[500]} <br/>
</div>
<div class="blackFont">
"summerslam": {similarities[501]}
</div>
<div class="blackFont">
"zarathos": {similarities[502]}
</div>
<div class="blackFont">
"mcmahon": {similarities[503]}
</div>
<div class="blackFont">
<br/>
"michaels": {similarities[504]} <br/>
</div>
<div class="blackFont">
<br/>
"pipping": {similarities[505]} <br/>
</div>
<div class="blackFont">
<br/>
"wrestled": {similarities[506]} <br/>
</div>
<div class="blackFont">
<br/>
"headlock": {similarities[507]} <br/>
</div>
<div class="blackFont">
"wyrm": {similarities[508]}
</div>
<div class="blackFont">
"cornerman": {similarities[509]}
</div>
<div class="blackFont">
"volthoom": {similarities[510]}
</div>

<div class="blackFont">
<br/>
You will be a housekeeper: {similarities[511]} <br/>
</div>
<div class="blackFont">
<br/>
"hairdresser": {similarities[512]} <br/>
</div>
<div class="blackFont">
<br/>
"landlady": {similarities[513]} <br/>
</div>
<div class="blackFont">
<br/>
"babysitter": {similarities[514]} <br/>
</div>
<div class="blackFont">
fiance": {similarities[515]}
</div>
<div class="blackFont">
"nanny": {similarities[516]}
</div>
<div class="blackFont">
"fiancé": {similarities[517]}
</div>
<div class="blackFont">
<br/>
"fiancée": {similarities[518]} <br/>
</div>
<div class="blackFont">
<br/>
"schoolteacher": {similarities[519]} <br/>
</div>
<div class="blackFont">
<br/>
"governess": {similarities[520]} <br/>
</div>
<div class="blackFont">
<br/>
"co-worker": {similarities[521]} <br/>
</div>
<div class="blackFont">
"prostitute": {similarities[522]}
</div>
<div class="blackFont">
"barmaid": {similarities[523]}
</div>
<div class="blackFont">
"bartender": {similarities[524]}
</div>
<div class="blackFont">
<br/>
"receptionist": {similarities[525]} <br/>
</div>

          </React.Fragment>
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
