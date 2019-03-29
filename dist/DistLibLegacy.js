class ConnioCore{constructor(){this.config={BaseURL:null,App:null,KEY:null,Secret:null,MQTTHost:null,MQTTPort:null,MQTTCientID:null,MQTTUsername:null,MQTTPassword:null,MQTTTopic:null}}configure(i){let e;if(i)e=JSON.parse(i);else if(!this.config.BaseURL){e=Creator.currentProject.serviceModel.getServiceObject("Connio").attributes.attrs}e&&(this.config.BaseURL=e.api.url,this.config.App=e.api.app,this.config.KEY=e.api.key,this.config.Secret=e.api.secret,this.config.MQTTHost=e.mqtt.host,this.config.MQTTPort=Number(e.mqtt.port),this.config.MQTTCientID=e.mqtt.clientId,this.config.MQTTUsername=e.mqtt.username,this.config.MQTTPassword=e.mqtt.password,this.config.MQTTTopic="connio/apps/"+this.config.App+"/devices/#")}connioConfigure(i,e,o){this.configure(),this.config.KEY=i,this.config.Secret=e}connioGetDeviceProfiles(i){this.configure();let e=this.config.BaseURL+"/deviceprofiles";$.ajax({url:e,type:"GET",headers:{Authorization:"Basic "+btoa(this.config.KEY+":"+this.config.Secret)},success:e=>{i(e)},error:(i,e,o)=>{console.log("Could not get the profiles. Could be network error")}})}connioGetDevices(i,e){this.configure();let o=this.config.BaseURL+"/devices?profile="+i;$.ajax({url:o,type:"GET",headers:{Authorization:"Basic "+btoa(this.config.KEY+":"+this.config.Secret)},success:i=>{e(i)},error:(i,e,o)=>{console.log("Could not get the devices.")}})}connioGetProperties(i,e){this.configure();let o=this.config.BaseURL+"/deviceprofiles/"+i+"/properties";$.ajax({url:o,type:"GET",headers:{Authorization:"Basic "+btoa(this.config.KEY+":"+this.config.Secret)},success:i=>{e(i)},error:(i,e,o)=>{console.log("Could not get the properties.")}})}}var com=com||{};com.fc=com.fc||{},com.fc.JavaScriptDistLib=com.fc.JavaScriptDistLib||{},com.fc.JavaScriptDistLib.ConnioCore=ConnioCore;
//# sourceMappingURL=DistLibLegacy.js.map