/* eslint-disable no-console */
const fs = require('fs-extra')
const axios = require('axios')

const baseURL = 'https://learna-cms.herokuapp.com'
const contentDir = `${__dirname}/src/content`
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir)
}

const writeToFile = (item, filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath)
  }
  const fileName = `${filePath}/${item.slug}.json`
  const jsonString = JSON.stringify(item)
    .replace(/"meta":null/gi, '"meta":{}')
    .replace(/:null/gi, ':""')

  fs.writeFileSync(fileName, jsonString)
  const stats = fs.statSync(fileName)
  console.log(`Created ${fileName} (${stats.size} bytes)`)
}

const abridgeCourseList = (courses) => {
  console.log('Abridging courses')
  const returnList = []
  courses.forEach((c) => {
    returnList.push({
      id: c.id,
      slug: c.slug,
      title: c.title,
      list_image: c.list_image,
      introduction: c.introduction,
      visible: c.visible
    })
  })
  return returnList
}

const fetch = (endpoint) => {
  axios({
    baseURL,
    method: 'get',
    url: '/' + endpoint,
    responseType: 'json'
  })
    .then((response) => {
      response.data.forEach((item) => {
        if (!item.slug) {
          console.error('No slug for ' + endpoint)
          return
        }
        if (item.courses) {
          item.courses = abridgeCourseList(item.courses)
        }
        writeToFile(item, `${contentDir}/${endpoint}`)
      })

      return true
    })
    .catch((error) => {
      console.error(error)
    })
}

fetch('pages')
fetch('courses')
fetch('subjects')
