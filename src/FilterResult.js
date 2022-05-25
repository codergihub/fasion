import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProductImageList from './ProductImageList'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import catNav from './category-nav.json'
import MarkaNav from './marka-nav.json'
const { tree: navs, total } = catNav[0]['nav']
const { tree: mnavs, mtotal } = MarkaNav[0]['nav']

export default function FilterResult(props) {
  const {selectedTab,handleChange}=props


  return (
    <Box>
   
      <TabPanel value={selectedTab} index={0} sx={{display:'flex', justifyContent:'center'}}>
        <ProductMenu sx={{ height: "100%" }}   handleTabChange={handleChange}/>
      </TabPanel>
      <TabPanel value={selectedTab} index={1} sx={{display:'flex', justifyContent:'center'}}>
        <MarkaMenu sx={{ height: "100%" }} handleTabChange={handleChange}/>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <ProductImageList />
      </TabPanel>


    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}

      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}


function ProductMenu(props) {

  const {handleTabChange}=props

  function handleTreeClick(subcategory) {
    localStorage.setItem('subcategory', subcategory)
    localStorage.removeItem('marka')
    handleTabChange({},2)

  }

  return (<div>
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, }}
    >
      {Object.entries(navs).map((n, i) => {
        const category = n[0]
        const categoryTotal = n[1]['total']


        const { subcategories } = n[1]

        return (
          <TreeItem key={i} nodeId={category + i} label={<div><span>{category}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({categoryTotal})</span></div>}>
           <div style={{maxHeight:'20vh',  overflowX:'hidden',overflowY:'auto'}}>
            {Object.entries(subcategories).map((s, c) => {
              const subcategory = s[0]
              const subCatTotal = s[1]


              return <TreeItem key={c} id={subcategory} onClick={() => handleTreeClick(subcategory)} nodeId={`${subcategory}-${c}`} label={<span><span>{subcategory}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({subCatTotal})</span></span>} />

            })}
</div>
          </TreeItem>
        )

      })}
    </TreeView>


  </div>)
}
function MarkaMenu(props) {

  const {handleTabChange}=props
  function handleSubCategoryClick(subcategory) {
    localStorage.setItem('subcategory', subcategory)
    handleTabChange({},2)
  }
  function handleMarkaClick(marka) {
    
    localStorage.setItem('marka', marka)
    localStorage.removeItem('subcategory')
   
  }
  return (<div>
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ flexGrow: 1, }}
    >
      {Object.entries(mnavs).map((n, i) => {
        const marka = n[0]
        const totalByMarka = n[1]['total']


        const categories = Object.entries(n[1])

        return (
          <TreeItem  onClick={() => handleMarkaClick(marka)}   key={i} nodeId={marka + i} label={<div><span>{marka}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({totalByMarka})</span></div>}>
            {Object.entries(categories).filter((f, i) => i > 0).map((s, c) => {

              const category = s[1][0]
              const categoryTotal = s[1][1]['total']
              const subcategories = s[1][1]['subcategories']
       
              return (<TreeItem   nodeId={`${marka}-${category}-${c}`}  key={c} id={category+i} label={<span><span>{category}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({categoryTotal})</span></span>} >
                {
                <div style={{maxHeight:'20vh',   overflowX:'hidden',overflowY:'auto'}}>{
                  Object.entries(subcategories).map((s, sk) => {
                    const subcategory = s[0]
                    const subCatTotal = s[1]
                    return  <TreeItem  key={sk} id={marka+subcategory} onClick={() => handleSubCategoryClick(subcategory)} nodeId={`${marka}-${subcategory}-${sk}`} label={<span><span>{subcategory}</span><span style={{ color: '#9e9e9e', marginLeft: 2, borderRadius: 25, padding: 2 }}>({subCatTotal})</span></span>} />
                  })
            
                }</div>}

              </TreeItem>)

            })}

          </TreeItem>
        )





      })}
    </TreeView>


  </div>)
}