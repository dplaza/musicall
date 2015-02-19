/*! wad 2015-02-07 */
!function(a){var b="recorderWorker.js",c=function(a,c){var d=c||{},e=d.bufferLen||4096;this.context=a.context,this.node=(this.context.createScriptProcessor||this.context.createJavaScriptNode).call(this.context,e,2,2);var f=new Worker(d.workerPath||b);f.postMessage({command:"init",config:{sampleRate:this.context.sampleRate}});var g,h=!1;this.node.onaudioprocess=function(a){h&&f.postMessage({command:"record",buffer:[a.inputBuffer.getChannelData(0),a.inputBuffer.getChannelData(1)]})},this.configure=function(a){for(var b in a)a.hasOwnProperty(b)&&(d[b]=a[b])},this.record=function(){h=!0},this.stop=function(){h=!1},this.clear=function(){f.postMessage({command:"clear"})},this.getBuffer=function(a){g=a||d.callback,f.postMessage({command:"getBuffer"})},this.exportWAV=function(a,b){if(g=a||d.callback,b=b||d.type||"audio/wav",!g)throw new Error("Callback not set");f.postMessage({command:"exportWAV",type:b})},f.onmessage=function(a){var b=a.data;g(b)},a.connect(this.node),this.node.connect(this.context.destination)};c.forceDownload=function(b,c){var d=(a.URL||a.webkitURL).createObjectURL(b),e=a.document.createElement("a");e.href=d,e.download=c||"output.wav";var f=document.createEvent("Event");f.initEvent("click",!0,!0),e.dispatchEvent(f)},a.Recorder=c}(window);var audioContext=window.AudioContext||window.webkitAudioContext,context=new audioContext;getUserMedia=navigator.mozGetUserMedia||navigator.webkitGetUserMedia||navigator.getUserMedia,getUserMedia?getUserMedia=getUserMedia.bind(navigator):console.log("get user media is not supported");var Wad=function(){function a(a,b){var c=4,d=1e3,e=1e3,f=-1,g=0,h=0,i=!1;if(a.length<e+d-c)return-1;for(var j=0;e>j;j++){var k=(a[j]-128)/128;h+=k*k}if(h=Math.sqrt(h/e),.01>h)return-1;for(var l=1,m=c;d>=m;m++){for(var n=0,j=0;e>j;j++)n+=Math.abs((a[j]-128)/128-(a[j+m]-128)/128);if(n=1-n/e,n>.9&&n>l)i=!0;else if(i)return b/f;l=n,n>g&&(g=n,f=m)}return g>.01?b/f:-1}var b=function(){Math.seed=6,Math.seededRandom=function(a,b){a=a||1,b=b||0,Math.seed=(9301*Math.seed+49297)%233280;var c=Math.seed/233280;return b+c*(a-b)};for(var a=2*context.sampleRate,b=context.createBuffer(1,a,context.sampleRate),c=b.getChannelData(0),d=0;a>d;d++)c[d]=2*Math.seededRandom()-1;return b}(),c=function(a){return"[object Array]"===Object.prototype.toString.call(a)},d=function(a,b){a.env={attack:b.env?D(b.env.attack,1):0,decay:b.env?D(b.env.decay,0):0,sustain:b.env?D(b.env.sustain,1):1,hold:b.env?D(b.env.hold,3.14):3.14,release:b.env?D(b.env.release,0):0},a.defaultEnv={attack:b.env?D(b.env.attack,1):0,decay:b.env?D(b.env.decay,0):0,sustain:b.env?D(b.env.sustain,1):1,hold:b.env?D(b.env.hold,3.14):3.14,release:b.env?D(b.env.release,0):0}},e=function(a,b){b.filter&&(c(b.filter)?b.filter.forEach(function(b){e(a,{filter:b})}):(b.filter=[b.filter],a.filter=b.filter))},f=function(a,b){var c=new XMLHttpRequest;c.open("GET",a.source,!0),c.responseType="arraybuffer",a.playable--,c.onload=function(){context.decodeAudioData(c.response,function(c){a.decodedBuffer=c,b&&b(a),a.playable++,a.playOnLoad&&a.play(a.playOnLoadArg)})},c.send()},g=function(a,b){b.vibrato&&(a.vibrato={shape:D(b.vibrato.shape,"sine"),speed:D(b.vibrato.speed,1),magnitude:D(b.vibrato.magnitude,5),attack:D(b.vibrato.attack,0)})},h=function(a,b){b.tremolo&&(a.tremolo={shape:D(b.vibrato.shape,"sine"),speed:D(b.vibrato.speed,1),magnitude:D(b.vibrato.magnitude,5),attack:D(b.vibrato.attack,1)})},i=function(a,b){if(b.reverb){a.reverb={wet:D(b.reverb.wet,1)};var c=b.reverb.impulse||m.defaultImpulse,d=new XMLHttpRequest;d.open("GET",c,!0),d.responseType="arraybuffer",a.playable--,d.onload=function(){context.decodeAudioData(d.response,function(c){a.reverb.buffer=c,a.playable++,a.playOnLoad&&a.play(a.playOnLoadArg),a instanceof m.Poly&&a.setUp(b)})},d.send()}},j=function(a,b){a.panning="panning"in b?"number"==typeof b.panning?{location:[b.panning,0,0]}:{location:[b.panning[0],b.panning[1],b.panning[2]]}:{location:[0,0,0]}},k=function(a,b){b.delay&&(a.delay={delayTime:D(b.delay.delayTime,.5),maxDelayTime:D(b.delay.maxDelayTime,2),feedback:D(b.delay.feedback,.25),wet:D(b.delay.wet,.25)})},l=function(a,b){getUserMedia({audio:!0,video:!1},function(c){a.nodes=[],a.mediaStreamSource=context.createMediaStreamSource(c),a.gain=context.createGain(),a.gain.gain.value=a.volume,a.nodes.push(a.mediaStreamSource),a.nodes.push(a.gain),a.filter&&s(a,b),a.reverb&&u(a,b),a.panning&&(a.panning.node=context.createPanner(),a.panning.node.setPosition(a.panning.location[0],a.panning.location[1],a.panning.location[2]),a.nodes.push(a.panning.node)),a.delay&&y(a,b)},function(a){console.log("Error setting up microphone input: ",a)})},m=function(a){if(this.source=a.source,this.destination=a.destination||context.destination,this.volume=D(a.volume,1),this.defaultVolume=this.volume,this.playable=1,this.pitch=m.pitches[a.pitch]||a.pitch||440,this.detune=a.detune||0,this.globalReverb=a.globalReverb||!1,this.gain=[],this.loop=a.loop||!1,d(this,a),e(this,a),g(this,a),h(this,a),i(this,a),this.constructExternalFx(a,context),j(this,a),k(this,a),"noise"===this.source)this.decodedBuffer=b;else if("mic"===this.source)l(this,a);else if("object"==typeof this.source){var c=context.createBuffer(2,this.source[0].length,context.sampleRate);c.getChannelData(0).set(this.source[0]),c.getChannelData(1).set(this.source[1]),this.decodedBuffer=c}else this.source in{sine:0,sawtooth:0,square:0,triangle:0}?a.callback&&a.callback(this):f(this,a.callback)},n=function(a,b){a.filter.forEach(function(a){a.node.frequency.linearRampToValueAtTime(a.frequency,b.exactTime),a.node.frequency.linearRampToValueAtTime(a.env.frequency,b.exactTime+a.env.attack)})},o=function(a,b){a.gain[0].gain.linearRampToValueAtTime(1e-4,b.exactTime),a.gain[0].gain.linearRampToValueAtTime(a.volume,b.exactTime+a.env.attack+1e-5),a.gain[0].gain.linearRampToValueAtTime(a.volume*a.env.sustain,b.exactTime+a.env.attack+a.env.decay+2e-5),a.gain[0].gain.linearRampToValueAtTime(a.volume*a.env.sustain,b.exactTime+a.env.attack+a.env.decay+a.env.hold+3e-5),a.gain[0].gain.linearRampToValueAtTime(1e-4,b.exactTime+a.env.attack+a.env.decay+a.env.hold+a.env.release+4e-5),a.soundSource.start(b.exactTime),a.soundSource.stop(b.exactTime+a.env.attack+a.env.decay+a.env.hold+a.env.release)},p=function(a,b){for(var c=b&&b.destination||a.destination,d=1;d<a.nodes.length;d++){if("custom"===a.nodes[d-1].interface)var e=a.nodes[d-1].output;else var e=a.nodes[d-1];if("custom"===a.nodes[d].interface)var f=a.nodes[d].input;else var f=a.nodes[d];e.connect(f)}a.nodes[a.nodes.length-1].connect(c),m.reverb&&a.globalReverb&&(a.nodes[a.nodes.length-1].connect(m.reverb.node),m.reverb.node.connect(m.reverb.gain),m.reverb.gain.connect(c))},q=function(a,b){b=b||{},a.soundSource=context.createOscillator(),a.soundSource.type=a.source,a.soundSource.frequency.value=b.pitch?b.pitch in m.pitches?m.pitches[b.pitch]:b.pitch:a.pitch,a.soundSource.detune.value=b.detune||a.detune},r=function(a,b){b&&b.env?(a.env.attack=D(b.env.attack,a.defaultEnv.attack),a.env.decay=D(b.env.decay,a.defaultEnv.decay),a.env.sustain=D(b.env.sustain,a.defaultEnv.sustain),a.env.hold=D(b.env.hold,a.defaultEnv.hold),a.env.release=D(b.env.release,a.defaultEnv.release)):a.env={attack:a.defaultEnv.attack,decay:a.defaultEnv.decay,sustain:a.defaultEnv.sustain,hold:a.defaultEnv.hold,release:a.defaultEnv.release}},s=function(a,b){a.filter.forEach(function(c,d){c.node=context.createBiquadFilter(),c.node.type=c.type,c.node.frequency.value=b.filter[d]?b.filter[d].frequency||c.frequency:c.frequency,c.node.Q.value=b.filter[d]?b.filter[d].q||c.q:c.q,(b.filter[d].env||a.filter[d].env)&&"mic"!==a.source&&(c.env={attack:b.filter[d].env&&b.filter[d].env.attack||a.filter[d].env.attack,frequency:b.filter[d].env&&b.filter[d].env.frequency||a.filter[d].env.frequency}),a.nodes.push(c.node)})},t=function(a,b){b&&b.filter&&a.filter?(c(b.filter)||(b.filter=[b.filter]),s(a,b)):a.filter&&s(a,a)},u=function(a){var b={"interface":"custom",input:context.createGain(),convolver:context.createConvolver(),wet:context.createGain(),output:context.createGain()};b.convolver.buffer=a.reverb.buffer,b.wet.gain.value=a.reverb.wet,b.input.connect(b.convolver),b.input.connect(b.output),b.convolver.connect(b.wet),b.wet.connect(b.output),a.reverb.node=b,a.nodes.push(a.reverb.node)},v=function(a,b){if(b&&b.panning||a.panning){if(a.panning.node=context.createPanner(),b&&b.panning)if(console.log("arg!",b.panning),"number"==typeof b.panning)var c=[b.panning,0,0];else var c=[b.panning[0],b.panning[1],b.panning[2]];else if(a.panning)var c=a.panning.location;else var c=[0,0,0];a.panning.node.setPosition(c[0],c[1],c[2]),a.nodes.push(a.panning.node)}},w=function(a){a.vibrato.wad=new m({source:a.vibrato.shape,pitch:a.vibrato.speed,volume:a.vibrato.magnitude,env:{attack:a.vibrato.attack},destination:a.soundSource.frequency}),a.vibrato.wad.play()},x=function(a){a.tremolo.wad=new m({source:a.tremolo.shape,pitch:a.tremolo.speed,volume:a.tremolo.magnitude,env:{attack:a.tremolo.attack,hold:10},destination:a.gain[0].gain}),a.tremolo.wad.play()},y=function(a,b){if(a.delay){b.delay||(b.delay={});var c={"interface":"custom",input:context.createGain(),output:context.createGain(),delayNode:context.createDelay(maxDelayTime=a.delay.maxDelayTime),feedbackNode:context.createGain(),wetNode:context.createGain()};c.delayNode.delayTime.value=D(b.delay.delayTime,a.delay.delayTime),c.feedbackNode.gain.value=D(b.delay.feedback,a.delay.feedback),c.wetNode.gain.value=D(b.delay.wet,a.delay.wet),c.input.connect(c.delayNode),c.input.connect(c.output),c.delayNode.connect(c.feedbackNode),c.delayNode.connect(c.wetNode),c.feedbackNode.connect(c.delayNode),c.wetNode.connect(c.output),a.delay.delayNode=c,a.nodes.push(c)}},z=function(a,b){a.compressor=context.createDynamicsCompressor(),a.compressor.attack.value=D(b.compressor.attack,a.compressor.attack.value),a.compressor.knee.value=D(b.compressor.knee,a.compressor.knee.value),a.compressor.ratio.value=D(b.compressor.ratio,a.compressor.ratio.value),a.compressor.release.value=D(b.compressor.release,a.compressor.release.value),a.compressor.threshold.value=D(b.compressor.threshold,a.compressor.threshold.value),a.nodes.push(a.compressor)};m.prototype.constructExternalFx=function(){},m.prototype.setUpExternalFxOnPlay=function(){},m.prototype.play=function(a){return a=a||{},this.playable<1?(this.playOnLoad=!0,this.playOnLoadArg=a):"mic"===this.source?p(this,a):(this.nodes=[],a.wait||(a.wait=0),this.volume=a.volume?a.volume:this.defaultVolume,this.source in{sine:0,sawtooth:0,square:0,triangle:0}?q(this,a):(this.soundSource=context.createBufferSource(),this.soundSource.buffer=this.decodedBuffer,("noise"===this.source||this.loop||a.loop)&&(this.soundSource.loop=!0)),void 0===a.exactTime&&(a.exactTime=context.currentTime+a.wait),this.nodes.push(this.soundSource),r(this,a),t(this,a),this.setUpExternalFxOnPlay(a,context),this.gain.unshift(context.createGain()),this.gain[0].label=a.label,this.nodes.push(this.gain[0]),this.gain.length>15&&(this.gain.length=15),this.reverb&&u(this,a),v(this,a),y(this,a),p(this,a),this.filter&&this.filter[0].env&&n(this,a),o(this,a),this.vibrato&&w(this,a),this.tremolo&&x(this,a)),a.callback&&a.callback(this),this},m.prototype.setVolume=function(a){return this.defaultVolume=a,this.gain.length>0&&(this.gain[0].gain.value=a),this},m.prototype.setDetune=function(a){return this.soundSource.detune.value=a,this},m.prototype.setPanning=function(a){return"number"==typeof a?this.panning.node.setPosition(a,this.panning.location[1],this.panning.location[2]):this.panning.node.setPosition(a[0],a[1],a[2]),this},m.prototype.stop=function(a){if("mic"!==this.source){if(a)for(var b=0;b<this.gain.length;b++)this.gain[b].label===a&&(this.gain[b].gain.cancelScheduledValues(context.currentTime),this.gain[b].gain.setValueAtTime(this.gain[b].gain.value,context.currentTime),this.gain[b].gain.linearRampToValueAtTime(1e-4,context.currentTime+this.env.release));a||(this.gain[0].gain.cancelScheduledValues(context.currentTime),this.gain[0].gain.setValueAtTime(this.gain[0].gain.value,context.currentTime),this.gain[0].gain.linearRampToValueAtTime(1e-4,context.currentTime+this.env.release))}else this.mediaStreamSource.disconnect(0)};var A=2048,B=new Uint8Array(A),C=function(a){var b=12*(Math.log(a/440)/Math.log(2));return Math.round(b)+69};m.Poly=function(a){a||(a={}),this.isSetUp=!1,this.playable=1,a.reverb?i(this,a):this.setUp(a)},m.Poly.prototype.setUp=function(a){if(this.wads=[],this.input=context.createAnalyser(),this.input.fftSize=2048,this.nodes=[this.input],this.destination=a.destination||context.destination,this.volume=a.volume||1,this.output=context.createGain(),this.output.gain.value=this.volume,"undefined"!=typeof Recorder&&a.recConfig){this.rec=new Recorder(this.output,a.recConfig),this.rec.recordings=[];var b=this,c=function(a){b.rec.createWadArg.source=a,b.rec.recordings.unshift(new m(b.rec.createWadArg))};this.rec.createWad=function(a){this.createWadArg=a||{env:{hold:9001}},this.getBuffer(c)}}this.globalReverb=a.globalReverb||!1,e(this,a),this.filter&&s(this,a),this.reverb&&u(this,a),this.constructExternalFx(a,context),j(this,a),v(this,a),a.compressor&&z(this,a),k(this,a),y(this,a),this.nodes.push(this.output),p(this,a),this.isSetUp=!0,a.callback&&a.callback(this)},m.Poly.prototype.updatePitch=function(){this.input.getByteTimeDomainData(B);var b=a(B,context.sampleRate);if(-1!==b&&11025!==b&&12e3!==b){var c=b;this.pitch=Math.floor(c);var d=C(c);this.noteName=m.pitchesArray[d-12]}var e=this;e.rafID=window.requestAnimationFrame(function(){e.updatePitch()})},m.Poly.prototype.stopUpdatingPitch=function(){cancelAnimationFrame(this.rafID)},m.Poly.prototype.setVolume=function(a){return this.isSetUp?this.output.gain.value=a:console.log("This PolyWad is not set up yet."),this},m.Poly.prototype.play=function(a){if(this.isSetUp)if(this.playable<1)this.playOnLoad=!0,this.playOnLoadArg=a;else{a&&a.volume&&(this.output.gain.value=a.volume,a.volume=void 0);for(var b=0;b<this.wads.length;b++)this.wads[b].play(a)}else console.log("This PolyWad is not set up yet.");return this},m.Poly.prototype.stop=function(a){if(this.isSetUp)for(var b=0;b<this.wads.length;b++)this.wads[b].stop(a)},m.Poly.prototype.add=function(a){return this.isSetUp?(a.destination=this.input,this.wads.push(a),a instanceof m.Poly&&(a.output.disconnect(0),a.output.connect(this.input))):console.log("This PolyWad is not set up yet."),this},m.Poly.prototype.remove=function(a){if(this.isSetUp)for(var b=0;b<this.wads.length;b++)this.wads[b]===a&&(this.wads[b].destination=context.destination,this.wads.splice(b,1),a instanceof m.Poly&&(a.output.disconnect(0),a.output.connect(context.destination)));return this},m.Poly.prototype.constructExternalFx=function(){},m.defaultImpulse="http://www.codecur.io/us/sendaudio/widehall.wav",m.setGlobalReverb=function(a){m.reverb={},m.reverb.node=context.createConvolver(),m.reverb.gain=context.createGain(),m.reverb.gain.gain.value=a.wet;var b=a.impulse||m.defaultImpulse,c=new XMLHttpRequest;c.open("GET",b,!0),c.responseType="arraybuffer",c.onload=function(){context.decodeAudioData(c.response,function(a){m.reverb.node.buffer=a})},c.send()};var D=function(a,b){var c=null==a?b:a;return c};m.pitches={A0:27.5,"A#0":29.1352,Bb0:29.1352,B0:30.8677,C1:32.7032,"C#1":34.6478,Db1:34.6478,D1:36.7081,"D#1":38.8909,Eb1:38.8909,E1:41.2034,F1:43.6535,"F#1":46.2493,Gb1:46.2493,G1:48.9994,"G#1":51.9131,Ab1:51.9131,A1:55,"A#1":58.2705,Bb1:58.2705,B1:61.7354,C2:65.4064,"C#2":69.2957,Db2:69.2957,D2:73.4162,"D#2":77.7817,Eb2:77.7817,E2:82.4069,F2:87.3071,"F#2":92.4986,Gb2:92.4986,G2:97.9989,"G#2":103.826,Ab2:103.826,A2:110,"A#2":116.541,Bb2:116.541,B2:123.471,C3:130.813,"C#3":138.591,Db3:138.591,D3:146.832,"D#3":155.563,Eb3:155.563,E3:164.814,F3:174.614,"F#3":184.997,Gb3:184.997,G3:195.998,"G#3":207.652,Ab3:207.652,A3:220,"A#3":233.082,Bb3:233.082,B3:246.942,C4:261.626,"C#4":277.183,Db4:277.183,D4:293.665,"D#4":311.127,Eb4:311.127,E4:329.628,F4:349.228,"F#4":369.994,Gb4:369.994,G4:391.995,"G#4":415.305,Ab4:415.305,A4:440,"A#4":466.164,Bb4:466.164,B4:493.883,C5:523.251,"C#5":554.365,Db5:554.365,D5:587.33,"D#5":622.254,Eb5:622.254,E5:659.255,F5:698.456,"F#5":739.989,Gb5:739.989,G5:783.991,"G#5":830.609,Ab5:830.609,A5:880,"A#5":932.328,Bb5:932.328,B5:987.767,C6:1046.5,"C#6":1108.73,Db6:1108.73,D6:1174.66,"D#6":1244.51,Eb6:1244.51,E6:1318.51,F6:1396.91,"F#6":1479.98,Gb6:1479.98,G6:1567.98,"G#6":1661.22,Ab6:1661.22,A6:1760,"A#6":1864.66,Bb6:1864.66,B6:1975.53,C7:2093,"C#7":2217.46,Db7:2217.46,D7:2349.32,"D#7":2489.02,Eb7:2489.02,E7:2637.02,F7:2793.83,"F#7":2959.96,Gb7:2959.96,G7:3135.96,"G#7":3322.44,Ab7:3322.44,A7:3520,"A#7":3729.31,Bb7:3729.31,B7:3951.07,C8:4186.01},m.pitchesArray=["C0","C#0","D0","D#0","E0","F0","F#0","G0","G#0","A0","A#0","B0","C1","C#1","D1","D#1","E1","F1","F#1","G1","G#1","A1","A#1","B1","C2","C#2","D2","D#2","E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5","C6","C#6","D6","D#6","E6","F6","F#6","G6","G#6","A6","A#6","B6","C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7","C8"],m.midiInstrument={play:function(){console.log("playing midi")},stop:function(){console.log("stopping midi")}},m.midiInputs=[],midiMap=function(a){console.log(a.receivedTime,a.data),144===a.data[0]?0===a.data[2]?(console.log("|| stopping note: ",m.pitchesArray[a.data[1]-12]),m.midiInstrument.stop(m.pitchesArray[a.data[1]-12])):a.data[2]>0&&(console.log("> playing note: ",m.pitchesArray[a.data[1]-12]),m.midiInstrument.play({pitch:m.pitchesArray[a.data[1]-12],label:m.pitchesArray[a.data[1]-12],callback:function(){}})):176===a.data[0]?(console.log("controller"),46==a.data[1]&&(127==a.data[2]?m.midiInstrument.pedalMod=!0:0==a.data[2]&&(m.midiInstrument.pedalMod=!1))):224===a.data[0]&&console.log("pitch bend")};var E=function(a){for(var b in a.inputs.values())console.log(b);m.midiInputs=[];for(var c=a.inputs.values(),d=c.next();!d.done;d=c.next())m.midiInputs.push(d.value);console.log("inputs: ",m.midiInputs);for(var e=0;e<m.midiInputs.length;e++)m.midiInputs[e].onmidimessage=midiMap},F=function(a){console.log("uh-oh! Something went wrong!  Error code: "+a.code)};if(navigator&&navigator.requestMIDIAccess)try{navigator.requestMIDIAccess().then(E,F)}catch(G){var H="There was an error on this page.\n\n";H+="Error description: "+G.message+"\n\n",H+="Click OK to continue.\n\n",console.log(H)}return m.presets={hiHatClosed:{source:"noise",env:{attack:.001,decay:.008,sustain:.2,hold:.03,release:.01},filter:{type:"highpass",frequency:400,q:1}},snare:{source:"noise",env:{attack:.001,decay:.01,sustain:.2,hold:.03,release:.02},filter:{type:"bandpass",frequency:300,q:.18}},hiHatOpen:{source:"noise",env:{attack:.001,decay:.008,sustain:.2,hold:.43,release:.01},filter:{type:"highpass",frequency:100,q:.2}},ghost:{source:"square",volume:.3,env:{attack:.01,decay:.002,sustain:.5,hold:2.5,release:.3},filter:{type:"lowpass",frequency:600,q:7,env:{attack:.7,frequency:1600}},vibrato:{attack:8,speed:8,magnitude:100}},piano:{source:"square",volume:1.4,env:{attack:.01,decay:.005,sustain:.2,hold:.015,release:.3},filter:{type:"lowpass",frequency:1200,q:8.5,env:{attack:.2,frequency:600}}}},m}();"undefined"!=typeof module&&module.exports&&(module.exports=Wad);