import axios from 'axios';
import { getHttp } from '../../util';
const config1 = { 'Content-type': 'application/x-www-form-urlencoded' };
const config2 = { 'Content-Type': 'multipart/form-data' };

const transformRequest = [function (data) {
  let ret = '';
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
  }
  return ret;
}];

/**
 * 获取列表左边伸缩导航栏的zTree树形
 * @author   lvzhiyuan
 * @date     2018/6/1
 * @return   返回列表左边伸缩导航栏的zTree树形
 */
export const getTree = () => axios.post('/api/front/legal/getTree');
/**
 * 根据包含了dictionaryId，pageNum，pageSize的obj获取列表信息
 * @author lvzhiyuan
 * @api    getRoadData
 * @date   2018/06/01
 * @param  obj——包括了dictionaryId，pageNum，pageSize三个属性
 * @return promise对象，用then(res => {})解析promise并输出res
 */
export const getListJson =
  (roadData) => getHttp('/api/front/legal/listJson', roadData);

// 删除法律列表
export const remove = (ids) => {
  axios.defaults.transformRequest = transformRequest;
  return axios({
    method: 'post',
    url: '/api/front/legal/remove',
    headers: config1,
    data: {
      ids: ids
    }
  });
};

/**
 *
 * @author   lvzhiyuan
 * @date     2018/6/1
 * @param    id——当前查看的行的id
 * @return   promise对象，包含了当前行的所有信息
 */
export const addEdit = (id) => getHttp('/api/front/legal/addEdit', {id});
/**
 *
 * @author   lvzhiyuan
 * @date     2018/6/1
 * @param    files——将要上传的文件
 * @return   promise对象，包含了当前上传了的文件的所有信息
 */
export const upload = (files) => axios.post('/upload/sys/attachment/upload', files, config2);

/**
 *
 * @author   lvzhiyuan
 * @date     2018/6/1
 * @param    form——封装了要传到后台的表单的对象
 * @return   promise对象
 */
export const saveOrUpdate = (form) => {
  axios.defaults.transformRequest = transformRequest;
  return axios({
    method: 'post',
    url: '/api/front/legal/saveOrUpdate',
    headers: config1,
    data: form,
    transformRequest: transformRequest
  });
};

export const deleteFile = (id) => axios.delete(`/upload/sys/attachment/delete?id=${id}`);
