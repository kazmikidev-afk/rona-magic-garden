var rg3_PerspectiveCamera=class extends rg3_Camera{constructor(fov2=50,aspect2=1,near=.1,far=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=fov2,this.zoom=1,this.near=near,this.far=far,this.focus=10,this.aspect=aspect2,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(source,recursive){return super.copy(source,recursive),this.fov=source.fov,this.zoom=source.zoom,this.near=source.near,this.far=source.far,this.focus=source.focus,this.aspect=source.aspect,this.view=source.view===null?null:Object.assign({},source.view),this.filmGauge=source.filmGauge,this.filmOffset=source.filmOffset,this}setFocalLength(focalLength){let vExtentSlope=.5*this.getFilmHeight()/focalLength;this.fov=rg3_RAD2DEG*2*Math.atan(vExtentSlope),this.updateProjectionMatrix()}getFocalLength(){let vExtentSlope=Math.tan(rg3_DEG2RAD*.5*this.fov);return .5*this.getFilmHeight()/vExtentSlope}getEffectiveFOV(){return rg3_RAD2DEG*2*Math.atan(Math.tan(rg3_DEG2RAD*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(distance,minTarget,maxTarget){rg3__v3$1.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),minTarget.set(rg3__v3$1.x,rg3__v3$1.y).multiplyScalar(-distance/rg3__v3$1.z),rg3__v3$1.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),maxTarget.set(rg3__v3$1.x,rg3__v3$1.y).multiplyScalar(-distance/rg3__v3$1.z)}getViewSize(distance,target){return this.getViewBounds(distance,rg3__minTarget,rg3__maxTarget),target.subVectors(rg3__maxTarget,rg3__minTarget)}setViewOffset(fullWidth,fullHeight,x,y,width,height){this.aspect=fullWidth/fullHeight,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=fullWidth,this.view.fullHeight=fullHeight,this.view.offsetX=x,this.view.offsetY=y,this.view.width=width,this.view.height=height,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let near=this.near,top=near*Math.tan(rg3_DEG2RAD*.5*this.fov)/this.zoom,height=2*top,width=this.aspect*height,left=-.5*width,view=this.view;if(this.view!==null&&this.view.enabled){let fullWidth=view.fullWidth,fullHeight=view.fullHeight;left+=view.offsetX*width/fullWidth,top-=view.offsetY*height/fullHeight,width*=view.width/fullWidth,height*=view.height/fullHeight}let skew=this.filmOffset;skew!==0&&(left+=near*skew/this.getFilmWidth()),this.projectionMatrix.makePerspective(left,left+width,top,top-height,near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(meta){let data=super.toJSON(meta);return data.object.fov=this.fov,data.object.zoom=this.zoom,data.object.near=this.near,data.object.far=this.far,data.object.focus=this.focus,data.object.aspect=this.aspect,this.view!==null&&(data.object.view=Object.assign({},this.view)),data.object.filmGauge=this.filmGauge,data.object.filmOffset=this.filmOffset,data}};;
var rg3_OrthographicCamera=class extends rg3_Camera{constructor(left=-1,right=1,top=1,bottom=-1,near=.1,far=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=left,this.right=right,this.top=top,this.bottom=bottom,this.near=near,this.far=far,this.updateProjectionMatrix()}copy(source,recursive){return super.copy(source,recursive),this.left=source.left,this.right=source.right,this.top=source.top,this.bottom=source.bottom,this.near=source.near,this.far=source.far,this.zoom=source.zoom,this.view=source.view===null?null:Object.assign({},source.view),this}setViewOffset(fullWidth,fullHeight,x,y,width,height){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=fullWidth,this.view.fullHeight=fullHeight,this.view.offsetX=x,this.view.offsetY=y,this.view.width=width,this.view.height=height,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let dx=(this.right-this.left)/(2*this.zoom),dy=(this.top-this.bottom)/(2*this.zoom),cx=(this.right+this.left)/2,cy=(this.top+this.bottom)/2,left=cx-dx,right=cx+dx,top=cy+dy,bottom=cy-dy;if(this.view!==null&&this.view.enabled){let scaleW=(this.right-this.left)/this.view.fullWidth/this.zoom,scaleH=(this.top-this.bottom)/this.view.fullHeight/this.zoom;left+=scaleW*this.view.offsetX,right=left+scaleW*this.view.width,top-=scaleH*this.view.offsetY,bottom=top-scaleH*this.view.height}this.projectionMatrix.makeOrthographic(left,right,top,bottom,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(meta){let data=super.toJSON(meta);return data.object.zoom=this.zoom,data.object.left=this.left,data.object.right=this.right,data.object.top=this.top,data.object.bottom=this.bottom,data.object.near=this.near,data.object.far=this.far,this.view!==null&&(data.object.view=Object.assign({},this.view)),data}};;
var rg3_DirectionalLightShadow=class extends rg3_LightShadow{constructor(){super(new rg3_OrthographicCamera(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}};;
var rg3_DirectionalLight=class extends rg3_Light{constructor(color,intensity){super(color,intensity),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rg3_Object3D.DEFAULT_UP),this.updateMatrix(),this.target=new rg3_Object3D,this.shadow=new rg3_DirectionalLightShadow}dispose(){super.dispose(),this.shadow.dispose()}copy(source){return super.copy(source),this.target=source.target.clone(),this.shadow=source.shadow.clone(),this}toJSON(meta){let data=super.toJSON(meta);return data.object.shadow=this.shadow.toJSON(),data.object.target=this.target.uuid,data}};;
var rg3_fov=-90;;
var rg3_aspect=1;;
var rg3_CubeCamera=class extends rg3_Object3D{constructor(near,far,renderTarget){super(),this.type="CubeCamera",this.renderTarget=renderTarget,this.coordinateSystem=null,this.activeMipmapLevel=0;let cameraPX=new rg3_PerspectiveCamera(rg3_fov,rg3_aspect,near,far);cameraPX.layers=this.layers,this.add(cameraPX);let cameraNX=new rg3_PerspectiveCamera(rg3_fov,rg3_aspect,near,far);cameraNX.layers=this.layers,this.add(cameraNX);let cameraPY=new rg3_PerspectiveCamera(rg3_fov,rg3_aspect,near,far);cameraPY.layers=this.layers,this.add(cameraPY);let cameraNY=new rg3_PerspectiveCamera(rg3_fov,rg3_aspect,near,far);cameraNY.layers=this.layers,this.add(cameraNY);let cameraPZ=new rg3_PerspectiveCamera(rg3_fov,rg3_aspect,near,far);cameraPZ.layers=this.layers,this.add(cameraPZ);let cameraNZ=new rg3_PerspectiveCamera(rg3_fov,rg3_aspect,near,far);cameraNZ.layers=this.layers,this.add(cameraNZ)}updateCoordinateSystem(){let coordinateSystem=this.coordinateSystem,cameras=this.children.concat(),[cameraPX,cameraNX,cameraPY,cameraNY,cameraPZ,cameraNZ]=cameras;for(let camera of cameras)this.remove(camera);if(coordinateSystem===rg3_WebGLCoordinateSystem)cameraPX.up.set(0,1,0),cameraPX.lookAt(1,0,0),cameraNX.up.set(0,1,0),cameraNX.lookAt(-1,0,0),cameraPY.up.set(0,0,-1),cameraPY.lookAt(0,1,0),cameraNY.up.set(0,0,1),cameraNY.lookAt(0,-1,0),cameraPZ.up.set(0,1,0),cameraPZ.lookAt(0,0,1),cameraNZ.up.set(0,1,0),cameraNZ.lookAt(0,0,-1);else if(coordinateSystem===rg3_WebGPUCoordinateSystem)cameraPX.up.set(0,-1,0),cameraPX.lookAt(-1,0,0),cameraNX.up.set(0,-1,0),cameraNX.lookAt(1,0,0),cameraPY.up.set(0,0,1),cameraPY.lookAt(0,1,0),cameraNY.up.set(0,0,-1),cameraNY.lookAt(0,-1,0),cameraPZ.up.set(0,-1,0),cameraPZ.lookAt(0,0,1),cameraNZ.up.set(0,-1,0),cameraNZ.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+coordinateSystem);for(let camera of cameras)this.add(camera),camera.updateMatrixWorld()}update(renderer,scene){this.parent===null&&this.updateMatrixWorld();let{renderTarget,activeMipmapLevel}=this;this.coordinateSystem!==renderer.coordinateSystem&&(this.coordinateSystem=renderer.coordinateSystem,this.updateCoordinateSystem());let[cameraPX,cameraNX,cameraPY,cameraNY,cameraPZ,cameraNZ]=this.children,currentRenderTarget=renderer.getRenderTarget(),currentActiveCubeFace=renderer.getActiveCubeFace(),currentActiveMipmapLevel=renderer.getActiveMipmapLevel(),currentXrEnabled=renderer.xr.enabled;renderer.xr.enabled=!1;let generateMipmaps=renderTarget.texture.generateMipmaps;renderTarget.texture.generateMipmaps=!1;let reversedDepthBuffer=!1;renderer.isWebGLRenderer===!0?reversedDepthBuffer=renderer.state.buffers.depth.getReversed():reversedDepthBuffer=renderer.reversedDepthBuffer,renderer.setRenderTarget(renderTarget,0,activeMipmapLevel),reversedDepthBuffer&&renderer.autoClear===!1&&renderer.clearDepth(),renderer.render(scene,cameraPX),renderer.setRenderTarget(renderTarget,1,activeMipmapLevel),reversedDepthBuffer&&renderer.autoClear===!1&&renderer.clearDepth(),renderer.render(scene,cameraNX),renderer.setRenderTarget(renderTarget,2,activeMipmapLevel),reversedDepthBuffer&&renderer.autoClear===!1&&renderer.clearDepth(),renderer.render(scene,cameraPY),renderer.setRenderTarget(renderTarget,3,activeMipmapLevel),reversedDepthBuffer&&renderer.autoClear===!1&&renderer.clearDepth(),renderer.render(scene,cameraNY),renderer.setRenderTarget(renderTarget,4,activeMipmapLevel),reversedDepthBuffer&&renderer.autoClear===!1&&renderer.clearDepth(),renderer.render(scene,cameraPZ),renderTarget.texture.generateMipmaps=generateMipmaps,renderer.setRenderTarget(renderTarget,5,activeMipmapLevel),reversedDepthBuffer&&renderer.autoClear===!1&&renderer.clearDepth(),renderer.render(scene,cameraNZ),renderer.setRenderTarget(currentRenderTarget,currentActiveCubeFace,currentActiveMipmapLevel),renderer.xr.enabled=currentXrEnabled,renderTarget.texture.needsPMREMUpdate=!0}};;
var rg3_ArrayCamera=class extends rg3_PerspectiveCamera{constructor(array=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=array}};;
var rg3__RESERVED_CHARS_RE="\\[\\]\\.:\\/";;
var rg3__reservedRe=new RegExp("["+rg3__RESERVED_CHARS_RE+"]","g");;
var rg3__wordChar="[^"+rg3__RESERVED_CHARS_RE+"]";;
var rg3__wordCharOrDot="[^"+rg3__RESERVED_CHARS_RE.replace("\\.","")+"]";;
var rg3__directoryRe=/((?:WC+[\/:])*)/.source.replace("WC",rg3__wordChar);;
var rg3__nodeRe=/(WCOD+)?/.source.replace("WCOD",rg3__wordCharOrDot);;
var rg3__objectRe=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rg3__wordChar);;
var rg3__propertyRe=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rg3__wordChar);;
var rg3__trackRe=new RegExp("^"+rg3__directoryRe+rg3__nodeRe+rg3__objectRe+rg3__propertyRe+"$");;
var rg3__supportedObjectNames=["material","materials","bones","map"];;
var rg3_Composite=class{constructor(targetGroup,path,optionalParsedPath){let parsedPath=optionalParsedPath||rg3_PropertyBinding.parseTrackName(path);this._targetGroup=targetGroup,this._bindings=targetGroup.subscribe_(path,parsedPath)}getValue(array,offset){this.bind();let firstValidIndex=this._targetGroup.nCachedObjects_,binding=this._bindings[firstValidIndex];binding!==void 0&&binding.getValue(array,offset)}setValue(array,offset){let bindings=this._bindings;for(let i=this._targetGroup.nCachedObjects_,n=bindings.length;i!==n;++i)bindings[i].setValue(array,offset)}bind(){let bindings=this._bindings;for(let i=this._targetGroup.nCachedObjects_,n=bindings.length;i!==n;++i)bindings[i].bind()}unbind(){let bindings=this._bindings;for(let i=this._targetGroup.nCachedObjects_,n=bindings.length;i!==n;++i)bindings[i].unbind()}};;
var rg3_PropertyBinding=class _PropertyBinding{constructor(rootNode,path,parsedPath){this.path=path,this.parsedPath=parsedPath||_PropertyBinding.parseTrackName(path),this.node=_PropertyBinding.findNode(rootNode,this.parsedPath.nodeName),this.rootNode=rootNode,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(root,path,parsedPath){return root&&root.isAnimationObjectGroup?new _PropertyBinding.Composite(root,path,parsedPath):new _PropertyBinding(root,path,parsedPath)}static sanitizeNodeName(name){return name.replace(/\s/g,"_").replace(rg3__reservedRe,"")}static parseTrackName(trackName){let matches=rg3__trackRe.exec(trackName);if(matches===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+trackName);let results={nodeName:matches[2],objectName:matches[3],objectIndex:matches[4],propertyName:matches[5],propertyIndex:matches[6]},lastDot=results.nodeName&&results.nodeName.lastIndexOf(".");if(lastDot!==void 0&&lastDot!==-1){let objectName=results.nodeName.substring(lastDot+1);rg3__supportedObjectNames.indexOf(objectName)!==-1&&(results.nodeName=results.nodeName.substring(0,lastDot),results.objectName=objectName)}if(results.propertyName===null||results.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+trackName);return results}static findNode(root,nodeName){if(nodeName===void 0||nodeName===""||nodeName==="."||nodeName===-1||nodeName===root.name||nodeName===root.uuid)return root;if(root.skeleton){let bone=root.skeleton.getBoneByName(nodeName);if(bone!==void 0)return bone}if(root.children){let searchNodeSubtree=function(children){for(let i=0;i<children.length;i++){let childNode=children[i];if(childNode.name===nodeName||childNode.uuid===nodeName)return childNode;let result=searchNodeSubtree(childNode.children);if(result)return result}return null},subTreeNode=searchNodeSubtree(root.children);if(subTreeNode)return subTreeNode}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(buffer,offset){buffer[offset]=this.targetObject[this.propertyName]}_getValue_array(buffer,offset){let source=this.resolvedProperty;for(let i=0,n=source.length;i!==n;++i)buffer[offset++]=source[i]}_getValue_arrayElement(buffer,offset){buffer[offset]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(buffer,offset){this.resolvedProperty.toArray(buffer,offset)}_setValue_direct(buffer,offset){this.targetObject[this.propertyName]=buffer[offset]}_setValue_direct_setNeedsUpdate(buffer,offset){this.targetObject[this.propertyName]=buffer[offset],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(buffer,offset){this.targetObject[this.propertyName]=buffer[offset],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(buffer,offset){let dest=this.resolvedProperty;for(let i=0,n=dest.length;i!==n;++i)dest[i]=buffer[offset++]}_setValue_array_setNeedsUpdate(buffer,offset){let dest=this.resolvedProperty;for(let i=0,n=dest.length;i!==n;++i)dest[i]=buffer[offset++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(buffer,offset){let dest=this.resolvedProperty;for(let i=0,n=dest.length;i!==n;++i)dest[i]=buffer[offset++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(buffer,offset){this.resolvedProperty[this.propertyIndex]=buffer[offset]}_setValue_arrayElement_setNeedsUpdate(buffer,offset){this.resolvedProperty[this.propertyIndex]=buffer[offset],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer,offset){this.resolvedProperty[this.propertyIndex]=buffer[offset],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(buffer,offset){this.resolvedProperty.fromArray(buffer,offset)}_setValue_fromArray_setNeedsUpdate(buffer,offset){this.resolvedProperty.fromArray(buffer,offset),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(buffer,offset){this.resolvedProperty.fromArray(buffer,offset),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(targetArray,offset){this.bind(),this.getValue(targetArray,offset)}_setValue_unbound(sourceArray,offset){this.bind(),this.setValue(sourceArray,offset)}bind(){let targetObject=this.node,parsedPath=this.parsedPath,objectName=parsedPath.objectName,propertyName=parsedPath.propertyName,propertyIndex=parsedPath.propertyIndex;if(targetObject||(targetObject=_PropertyBinding.findNode(this.rootNode,parsedPath.nodeName),this.node=targetObject),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!targetObject){rg3_warn("PropertyBinding: No target node found for track: "+this.path+".");return}if(objectName){let objectIndex=parsedPath.objectIndex;switch(objectName){case"materials":if(!targetObject.material){rg3_error("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!targetObject.material.materials){rg3_error("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}targetObject=targetObject.material.materials;break;case"bones":if(!targetObject.skeleton){rg3_error("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}targetObject=targetObject.skeleton.bones;for(let i=0;i<targetObject.length;i++)if(targetObject[i].name===objectIndex){objectIndex=i;break}break;case"map":if("map"in targetObject){targetObject=targetObject.map;break}if(!targetObject.material){rg3_error("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!targetObject.material.map){rg3_error("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}targetObject=targetObject.material.map;break;default:if(targetObject[objectName]===void 0){rg3_error("PropertyBinding: Can not bind to objectName of node undefined.",this);return}targetObject=targetObject[objectName]}if(objectIndex!==void 0){if(targetObject[objectIndex]===void 0){rg3_error("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,targetObject);return}targetObject=targetObject[objectIndex]}}let nodeProperty=targetObject[propertyName];if(nodeProperty===void 0){let nodeName=parsedPath.nodeName;rg3_error("PropertyBinding: Trying to update property for track: "+nodeName+"."+propertyName+" but it wasn't found.",targetObject);return}let versioning=this.Versioning.None;this.targetObject=targetObject,targetObject.isMaterial===!0?versioning=this.Versioning.NeedsUpdate:targetObject.isObject3D===!0&&(versioning=this.Versioning.MatrixWorldNeedsUpdate);let bindingType=this.BindingType.Direct;if(propertyIndex!==void 0){if(propertyName==="morphTargetInfluences"){if(!targetObject.geometry){rg3_error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!targetObject.geometry.morphAttributes){rg3_error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}targetObject.morphTargetDictionary[propertyIndex]!==void 0&&(propertyIndex=targetObject.morphTargetDictionary[propertyIndex])}bindingType=this.BindingType.ArrayElement,this.resolvedProperty=nodeProperty,this.propertyIndex=propertyIndex}else nodeProperty.fromArray!==void 0&&nodeProperty.toArray!==void 0?(bindingType=this.BindingType.HasFromToArray,this.resolvedProperty=nodeProperty):Array.isArray(nodeProperty)?(bindingType=this.BindingType.EntireArray,this.resolvedProperty=nodeProperty):this.propertyName=propertyName;this.getValue=this.GetterByBindingType[bindingType],this.setValue=this.SetterByBindingTypeAndVersioning[bindingType][versioning]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};;
rg3_PropertyBinding.Composite=rg3_Composite;;
rg3_PropertyBinding.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};;
rg3_PropertyBinding.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};;
rg3_PropertyBinding.prototype.GetterByBindingType=[rg3_PropertyBinding.prototype._getValue_direct,rg3_PropertyBinding.prototype._getValue_array,rg3_PropertyBinding.prototype._getValue_arrayElement,rg3_PropertyBinding.prototype._getValue_toArray];;
rg3_PropertyBinding.prototype.SetterByBindingTypeAndVersioning=[[rg3_PropertyBinding.prototype._setValue_direct,rg3_PropertyBinding.prototype._setValue_direct_setNeedsUpdate,rg3_PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rg3_PropertyBinding.prototype._setValue_array,rg3_PropertyBinding.prototype._setValue_array_setNeedsUpdate,rg3_PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rg3_PropertyBinding.prototype._setValue_arrayElement,rg3_PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,rg3_PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rg3_PropertyBinding.prototype._setValue_fromArray,rg3_PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,rg3_PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];;
var rg3__controlInterpolantsResultBuffer=new Float32Array(1);;
var rg3_Matrix2=class _Matrix2{static{_Matrix2.prototype.isMatrix2=!0}constructor(n11,n12,n21,n22){this.elements=[1,0,0,1],n11!==void 0&&this.set(n11,n12,n21,n22)}identity(){return this.set(1,0,0,1),this}fromArray(array,offset=0){for(let i=0;i<4;i++)this.elements[i]=array[i+offset];return this}set(n11,n12,n21,n22){let te=this.elements;return te[0]=n11,te[2]=n12,te[1]=n21,te[3]=n22,this}};;
function rg3_getByteLength(width,height,format,type){let typeByteLength=rg3_getTextureTypeByteLength(type);switch(format){case rg3_AlphaFormat:return width*height;case rg3_RedFormat:return width*height/typeByteLength.components*typeByteLength.byteLength;case rg3_RedIntegerFormat:return width*height/typeByteLength.components*typeByteLength.byteLength;case rg3_RGFormat:return width*height*2/typeByteLength.components*typeByteLength.byteLength;case rg3_RGIntegerFormat:return width*height*2/typeByteLength.components*typeByteLength.byteLength;case rg3_RGBFormat:return width*height*3/typeByteLength.components*typeByteLength.byteLength;case rg3_RGBAFormat:return width*height*4/typeByteLength.components*typeByteLength.byteLength;case rg3_RGBAIntegerFormat:return width*height*4/typeByteLength.components*typeByteLength.byteLength;case rg3_RGB_S3TC_DXT1_Format:case rg3_RGBA_S3TC_DXT1_Format:return Math.floor((width+3)/4)*Math.floor((height+3)/4)*8;case rg3_RGBA_S3TC_DXT3_Format:case rg3_RGBA_S3TC_DXT5_Format:return Math.floor((width+3)/4)*Math.floor((height+3)/4)*16;case rg3_RGB_PVRTC_2BPPV1_Format:case rg3_RGBA_PVRTC_2BPPV1_Format:return Math.max(width,16)*Math.max(height,8)/4;case rg3_RGB_PVRTC_4BPPV1_Format:case rg3_RGBA_PVRTC_4BPPV1_Format:return Math.max(width,8)*Math.max(height,8)/2;case rg3_RGB_ETC1_Format:case rg3_RGB_ETC2_Format:case rg3_R11_EAC_Format:case rg3_SIGNED_R11_EAC_Format:return Math.floor((width+3)/4)*Math.floor((height+3)/4)*8;case rg3_RGBA_ETC2_EAC_Format:case rg3_RG11_EAC_Format:case rg3_SIGNED_RG11_EAC_Format:return Math.floor((width+3)/4)*Math.floor((height+3)/4)*16;case rg3_RGBA_ASTC_4x4_Format:return Math.floor((width+3)/4)*Math.floor((height+3)/4)*16;case rg3_RGBA_ASTC_5x4_Format:return Math.floor((width+4)/5)*Math.floor((height+3)/4)*16;case rg3_RGBA_ASTC_5x5_Format:return Math.floor((width+4)/5)*Math.floor((height+4)/5)*16;case rg3_RGBA_ASTC_6x5_Format:return Math.floor((width+5)/6)*Math.floor((height+4)/5)*16;case rg3_RGBA_ASTC_6x6_Format:return Math.floor((width+5)/6)*Math.floor((height+5)/6)*16;case rg3_RGBA_ASTC_8x5_Format:return Math.floor((width+7)/8)*Math.floor((height+4)/5)*16;case rg3_RGBA_ASTC_8x6_Format:return Math.floor((width+7)/8)*Math.floor((height+5)/6)*16;case rg3_RGBA_ASTC_8x8_Format:return Math.floor((width+7)/8)*Math.floor((height+7)/8)*16;case rg3_RGBA_ASTC_10x5_Format:return Math.floor((width+9)/10)*Math.floor((height+4)/5)*16;case rg3_RGBA_ASTC_10x6_Format:return Math.floor((width+9)/10)*Math.floor((height+5)/6)*16;case rg3_RGBA_ASTC_10x8_Format:return Math.floor((width+9)/10)*Math.floor((height+7)/8)*16;case rg3_RGBA_ASTC_10x10_Format:return Math.floor((width+9)/10)*Math.floor((height+9)/10)*16;case rg3_RGBA_ASTC_12x10_Format:return Math.floor((width+11)/12)*Math.floor((height+9)/10)*16;case rg3_RGBA_ASTC_12x12_Format:return Math.floor((width+11)/12)*Math.floor((height+11)/12)*16;case rg3_RGBA_BPTC_Format:case rg3_RGB_BPTC_SIGNED_Format:case rg3_RGB_BPTC_UNSIGNED_Format:return Math.ceil(width/4)*Math.ceil(height/4)*16;case rg3_RED_RGTC1_Format:case rg3_SIGNED_RED_RGTC1_Format:return Math.ceil(width/4)*Math.ceil(height/4)*8;case rg3_RED_GREEN_RGTC2_Format:case rg3_SIGNED_RED_GREEN_RGTC2_Format:return Math.ceil(width/4)*Math.ceil(height/4)*16}throw new Error(`Unable to determine texture byte length for ${format} format.`)};
function rg3_getTextureTypeByteLength(type){switch(type){case rg3_UnsignedByteType:case rg3_ByteType:return{byteLength:1,components:1};case rg3_UnsignedShortType:case rg3_ShortType:case rg3_HalfFloatType:return{byteLength:2,components:1};case rg3_UnsignedShort4444Type:case rg3_UnsignedShort5551Type:return{byteLength:2,components:4};case rg3_UnsignedIntType:case rg3_IntType:case rg3_FloatType:return{byteLength:4,components:1};case rg3_UnsignedInt5999Type:case rg3_UnsignedInt101111Type:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${type}.`)};
typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));;
typeof window<"u"&&(window.__THREE__?rg3_warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");;
function rg3_WebGLAnimation(){let context=null,isAnimating=!1,animationLoop=null,requestId=null;function onAnimationFrame(time,frame){requestId=context.requestAnimationFrame(onAnimationFrame),animationLoop(time,frame)}return{start:function(){isAnimating!==!0&&animationLoop!==null&&context!==null&&(requestId=context.requestAnimationFrame(onAnimationFrame),isAnimating=!0)},stop:function(){context!==null&&context.cancelAnimationFrame(requestId),isAnimating=!1},setAnimationLoop:function(callback){animationLoop=callback},setContext:function(value){context=value}}};
function rg3_WebGLAttributes(gl){let buffers=new WeakMap;function createBuffer(attribute,bufferType){let array=attribute.array,usage=attribute.usage,size=array.byteLength,buffer=gl.createBuffer();gl.bindBuffer(bufferType,buffer),gl.bufferData(bufferType,array,usage),attribute.onUploadCallback();let type;if(array instanceof Float32Array)type=gl.FLOAT;else if(typeof Float16Array<"u"&&array instanceof Float16Array)type=gl.HALF_FLOAT;else if(array instanceof Uint16Array)attribute.isFloat16BufferAttribute?type=gl.HALF_FLOAT:type=gl.UNSIGNED_SHORT;else if(array instanceof Int16Array)type=gl.SHORT;else if(array instanceof Uint32Array)type=gl.UNSIGNED_INT;else if(array instanceof Int32Array)type=gl.INT;else if(array instanceof Int8Array)type=gl.BYTE;else if(array instanceof Uint8Array)type=gl.UNSIGNED_BYTE;else if(array instanceof Uint8ClampedArray)type=gl.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+array);return{buffer,type,bytesPerElement:array.BYTES_PER_ELEMENT,version:attribute.version,size}}function updateBuffer(buffer,attribute,bufferType){let array=attribute.array,updateRanges=attribute.updateRanges;if(gl.bindBuffer(bufferType,buffer),updateRanges.length===0)gl.bufferSubData(bufferType,0,array);else{updateRanges.sort((a,b)=>a.start-b.start);let mergeIndex=0;for(let i=1;i<updateRanges.length;i++){let previousRange=updateRanges[mergeIndex],range=updateRanges[i];range.start<=previousRange.start+previousRange.count+1?previousRange.count=Math.max(previousRange.count,range.start+range.count-previousRange.start):(++mergeIndex,updateRanges[mergeIndex]=range)}updateRanges.length=mergeIndex+1;for(let i=0,l=updateRanges.length;i<l;i++){let range=updateRanges[i];gl.bufferSubData(bufferType,range.start*array.BYTES_PER_ELEMENT,array,range.start,range.count)}attribute.clearUpdateRanges()}attribute.onUploadCallback()}function get(attribute){return attribute.isInterleavedBufferAttribute&&(attribute=attribute.data),buffers.get(attribute)}function remove(attribute){attribute.isInterleavedBufferAttribute&&(attribute=attribute.data);let data=buffers.get(attribute);data&&(gl.deleteBuffer(data.buffer),buffers.delete(attribute))}function update(attribute,bufferType){if(attribute.isInterleavedBufferAttribute&&(attribute=attribute.data),attribute.isGLBufferAttribute){let cached=buffers.get(attribute);(!cached||cached.version<attribute.version)&&buffers.set(attribute,{buffer:attribute.buffer,type:attribute.type,bytesPerElement:attribute.elementSize,version:attribute.version});return}let data=buffers.get(attribute);if(data===void 0)buffers.set(attribute,createBuffer(attribute,bufferType));else if(data.version<attribute.version){if(data.size!==attribute.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");updateBuffer(data.buffer,attribute,bufferType),data.version=attribute.version}}return{get,remove,update}};
var rg3_alphahash_fragment=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`;;
var rg3_alphahash_pars_fragment=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`;;
var rg3_alphamap_fragment=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`;;
var rg3_alphamap_pars_fragment=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`;;
var rg3_alphatest_fragment=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`;;
var rg3_alphatest_pars_fragment=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`;;
var rg3_aomap_fragment=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`;;
var rg3_aomap_pars_fragment=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`;;
var rg3_batching_pars_vertex=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`;;
var rg3_batching_vertex=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`;;
var rg3_begin_vertex=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`;;
var rg3_beginnormal_vertex=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`;;
var rg3_bsdfs=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`;;
var rg3_iridescence_fragment=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`;;
var rg3_bumpmap_pars_fragment=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`;;
var rg3_clipping_planes_fragment=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`;;
var rg3_clipping_planes_pars_fragment=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`;;
var rg3_clipping_planes_pars_vertex=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`;;
var rg3_clipping_planes_vertex=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`;;
var rg3_color_fragment=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`;;
var rg3_color_pars_fragment=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`;;
var rg3_color_pars_vertex=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`;;
var rg3_color_vertex=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`;;
var rg3_common=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`;;
var rg3_cube_uv_reflection_fragment=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`;;
var rg3_defaultnormal_vertex=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`;;
var rg3_displacementmap_pars_vertex=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`;;
var rg3_displacementmap_vertex=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`;;
var rg3_emissivemap_fragment=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`;;
var rg3_emissivemap_pars_fragment=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`;;
var rg3_colorspace_fragment="gl_FragColor = linearToOutputTexel( gl_FragColor );";;
var rg3_colorspace_pars_fragment=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`;;
var rg3_envmap_fragment=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`;;
var rg3_envmap_common_pars_fragment=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`;;
var rg3_envmap_pars_fragment=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`;;
var rg3_envmap_pars_vertex=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`;;
var rg3_envmap_vertex=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`;;
var rg3_fog_vertex=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`;;
var rg3_fog_pars_vertex=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`;;
var rg3_fog_fragment=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`;;
var rg3_fog_pars_fragment=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`;;
var rg3_gradientmap_pars_fragment=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`;;
var rg3_lightmap_pars_fragment=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`;;
var rg3_lights_lambert_fragment=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`;;
var rg3_lights_lambert_pars_fragment=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`;;
var rg3_lights_pars_begin=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`;;
var rg3_envmap_physical_pars_fragment=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`;;
var rg3_lights_toon_fragment=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`;;
var rg3_lights_toon_pars_fragment=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`;;
var rg3_lights_phong_fragment=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`;;
var rg3_lights_phong_pars_fragment=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`;;
