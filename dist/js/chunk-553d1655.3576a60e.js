(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-553d1655"],{"16be":function(t,e,i){"use strict";var n=i("f5d7"),r=i.n(n);r.a},"261c":function(t,e,i){"use strict";var n=i("75e7"),r=i.n(n);r.a},"3f9e":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bird",style:{backgroundPositionX:t.backgroundPositionX2Str}})},r=[],s=i("83af"),o={data:function(){return{backgroundPositionX:0}},props:{isActive:{type:Boolean,default:!0},isStartflapWings:{type:Boolean,default:!0}},methods:{flapWings:function(){this.backgroundPositionX<=-60?this.backgroundPositionX=0:this.backgroundPositionX-=30}},computed:{backgroundPositionX2Str:function(){return Object(s["num2strAddPx"])(this.backgroundPositionX)}}},a=o,p=(i("261c"),i("2877")),c=Object(p["a"])(a,n,r,!1,null,"0d5b6828",null);e["a"]=c.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,i){var n=i("1d80"),r=i("5899"),s="["+r+"]",o=RegExp("^"+s+s+"*"),a=RegExp(s+s+"*$"),p=function(t){return function(e){var i=String(n(e));return 1&t&&(i=i.replace(o,"")),2&t&&(i=i.replace(a,"")),i}};t.exports={start:p(1),end:p(2),trim:p(3)}},7156:function(t,e,i){var n=i("861d"),r=i("d2bb");t.exports=function(t,e,i){var s,o;return r&&"function"==typeof(s=e.constructor)&&s!==i&&n(o=s.prototype)&&o!==i.prototype&&r(t,o),t}},"75e7":function(t,e,i){},"9aeb":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"playingGame",on:{click:t.handleGameClick}},[i("div",{staticClass:"score"},[t._v(t._s(t.score))]),i("div",{staticClass:"location"},[t._l(t.pipeData,(function(e,n){return i("div",{key:n,staticClass:"pipe"},[i("div",{staticClass:"pipeUp",style:{top:t.num2strAddPx(e.upY),left:t.num2strAddPx(e.left)}}),i("div",{staticClass:"pipeDown",style:{top:t.num2strAddPx(e.downY),left:t.num2strAddPx(e.left)}})])})),i("Bird",{ref:"Bird",class:{nojump:!0},style:{top:t.num2strAddPx(this.topOfBird)}})],2)])},r=[],s=(i("a9e3"),i("3f9e")),o=i("83af"),a={data:function(){return{topOfBird:0,dropStepY:0,bodyHeight:1e3,pipeYDistance:150,pipeData:[],pipeLength:10,score:0,currentPipeIndex:0,isClick:!1,pipeWidth:52,maxTopOfBird:50,minTopOfBird:0}},components:{Bird:s["a"]},methods:{handleGameClick:function(){this.isClick||(this.isClick=!0),this.dropStepY=-10},droptopOfBird:function(){this.topOfBird+=++this.dropStepY},judgeKnock:function(){this.judgeBoundary(),this.judgePipe()},judgeBoundary:function(){(this.topOfBird<=this.minTop||this.topOfBird>=this.maxTop)&&this.failGame()},judgeSinglePipe:function(t){t.left<=30&&t.left>=-this.pipeWidth&&(this.topOfBird>=t.upY+852&&this.topOfBird+30<=t.downY||this.failGame())},judgePipe:function(){this.judgeSinglePipe(this.pipeData[this.currentPipeIndex])},isPassCurrentPipe:function(){return this.pipeData[this.currentPipeIndex].left<-67},failGame:function(){this.$emit("gameOver",!1,this.score)},createPipe:function(t){var e=Math.floor(Math.random()*(this.maxTop-70))+20,i=e-this.pipeYDistance-850;return{upY:i,downY:e,left:t}},pipeMove:function(){for(var t=0;t<this.pipeLength;t++)this.pipeData[t].left-=this.backgroundMoveSpeed},num2strAddPx:o["num2strAddPx"],addDeletePipe:function(){var t=this.pipeData.shift();this.pipeData.push(this.createPipe(t.left+300*this.pipeLength))}},props:{isStartGame:Boolean,handleTimes:Number,appClick:Boolean,backgroundMoveSpeed:{type:Number,default:5}},mounted:function(){this.bodyHeight=document.body.scrollHeight;for(var t=0;t<this.pipeLength;t++)this.pipeData.push(this.createPipe(300*(t+1)))},computed:{minTop:function(){return-(this.bodyHeight/2-10)},maxTop:function(){return this.bodyHeight/2+10},time30:function(){return this.$store.state.counter}},watch:{time30:function(t){this.isClick&&(this.pipeMove(),this.droptopOfBird(),this.pipeData[0].left<=-1e3&&(this.addDeletePipe(),this.currentPipeIndex--),this.judgeKnock(),this.isPassCurrentPipe()&&(this.score++,this.currentPipeIndex++)),t%10==0&&this.$refs.Bird.flapWings()}}},p=a,c=(i("16be"),i("2877")),u=Object(c["a"])(p,n,r,!1,null,"304ee7d6",null);e["default"]=u.exports},a9e3:function(t,e,i){"use strict";var n=i("83ab"),r=i("da84"),s=i("94ca"),o=i("6eeb"),a=i("5135"),p=i("c6b6"),c=i("7156"),u=i("c04e"),d=i("d039"),f=i("7c73"),h=i("241c").f,l=i("06cf").f,g=i("9bf2").f,m=i("58a8").trim,b="Number",P=r[b],v=P.prototype,k=p(f(v))==b,x=function(t){var e,i,n,r,s,o,a,p,c=u(t,!1);if("string"==typeof c&&c.length>2)if(c=m(c),e=c.charCodeAt(0),43===e||45===e){if(i=c.charCodeAt(2),88===i||120===i)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+c}for(s=c.slice(2),o=s.length,a=0;a<o;a++)if(p=s.charCodeAt(a),p<48||p>r)return NaN;return parseInt(s,n)}return+c};if(s(b,!P(" 0o1")||!P("0b1")||P("+0x1"))){for(var I,y=function(t){var e=arguments.length<1?0:t,i=this;return i instanceof y&&(k?d((function(){v.valueOf.call(i)})):p(i)!=b)?c(new P(x(e)),i,y):x(e)},B=n?h(P):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;B.length>N;N++)a(P,I=B[N])&&!a(y,I)&&g(y,I,l(P,I));y.prototype=v,v.constructor=y,o(r,b,y)}},f5d7:function(t,e,i){}}]);
//# sourceMappingURL=chunk-553d1655.3576a60e.js.map