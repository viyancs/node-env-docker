<script>
  import Grid from 'svelte-grid'
  import gridHelp from 'svelte-grid/build/helper/index'
  import { PanelDailyTasks, PanelMail, PanelChat, PanelTeamTask } from './index'
  import { store } from './auth/fireStore'
  const profile = store.profile

  let user = $profile
  let settings = user.settings
  const id = () => '_' + Math.random().toString(36).substr(2, 9)
  let comps = {
    PanelMail,
    PanelChat,
    PanelTeamTask,
    PanelDailyTasks
  }
  // normal mode
  const nbCols = 12
  const cols = [[1820, nbCols]]

  //grid is devided into 6 columns ->
  let minWidth = 2

  // initial items (sizes) from db
  const itemsInit = mode => {
    let items = []
    for (let key in comps) {
      let sizes = settings.sizes[mode][key]
      sizes.min.w = minWidth
      if (key != 'PanelChat') {
        if (!settings.display[key]) sizes.resizable = false
        items = [
          ...items,
          {
            [nbCols]: gridHelp.item(sizes),
            id: id(),
            comp: comps[key],
            compName: key
          }
        ]
      }
    }
    //chat pannel does not exist in settings.display options --> manually add it
    let sizes = settings.sizes[mode]['PanelChat']
    sizes.min.w = minWidth
    sizes.resizable = true
    items = [
      ...items,
      {
        [nbCols]: gridHelp.item(sizes),
        id: id(),
        comp: comps['PanelChat'],
        compName: 'PanelChat'
      }
    ]
    return items
  }
  let items = itemsInit('basicMode')
  //on drag drop / drag resize update  settings (locally)
  const OnSizePositionChange = (items, mode) => {
    for (let el of items) {
      if (el.compName == 'PanelMail') {
        settings.sizes[mode][el.compName] = el[nbCols]
      }
      if (el.compName == 'PanelChat') {
        settings.sizes[mode][el.compName] = el[nbCols]
      }
      if (el.compName == 'PanelTeamTask') {
        settings.sizes[mode][el.compName] = el[nbCols]
      }
      if (el.compName == 'PanelDailyTasks') {
        settings.sizes[mode][el.compName] = el[nbCols]
      }
    }
  }
  //on mouse up update db ( settings )
  const SaveChangesToDB = () => {
    settings.store.set(settings)
    settings.save()
  }

  //Focus Mode
  let itemsFocus = [
    {
      id: id(),
      compName: 'PanelMail'
    }
  ]
  let inFocus = false
  let focusComp = ''
  let oldComp = ''

  //get element to be enabled for foucs mode
  const getFocusElement = e => {
    !inFocus
      ? (oldComp =
          e.target.closest('.svlt-grid-item').firstElementChild.firstElementChild)
      : ''
    focusComp = e.target.closest('.svlt-grid-item').firstElementChild.firstElementChild
    focusMode(oldComp, focusComp)
  }
  //initialize focus mode
  const focusMode = (oldComp, focusComp) => {
    itemsFocus[0]['comp'] = comps[focusComp.id]
    itemsFocus[0]['compName'] = focusComp.id
    let sizes = settings.sizes['focusMode'][focusComp.id]
    sizes.min.w = minWidth
    itemsFocus[0][nbCols] = gridHelp.item(sizes)
    let focusWrapper = document.querySelector('.focus')
    if (inFocus) {
      focusWrapper.style = 'opacity:0;z-index:-5;'
      inFocus = !inFocus
    } else {
      inFocus = !inFocus
      focusWrapper.style = 'z-index:101;opacity:1;'
    }

    if (!inFocus) {
      oldComp.style = 'display:flex'
      oldComp = ''
      focusComp = ''
    } else {
      oldComp.style = 'display:none'
    }
  }
  //exit focus mode on Esc
  const focusModeOnKeyUp = e => {
    if (inFocus) {
      if (e.keyCode == 27) {
        focusMode(oldComp, focusComp)
        SaveChangesToDB()
      }
    }
  }
  document.addEventListener('keyup', focusModeOnKeyUp)
</script>

<div class="demo-container">
  <Grid
    on:pointerup={SaveChangesToDB}
    on:change={() => OnSizePositionChange(items, 'basicMode')}
    bind:items
    rowHeight={100}
    let:item
    let:dataItem
    {cols}
    fillSpace={true}
    let:movePointerDown
  >
    <div class="demo-widget">
      <svelte:component this={dataItem.comp} {getFocusElement} {movePointerDown} />
    </div>
  </Grid>
</div>

<div
  class="focus"
  on:dblclick={() => {
    focusMode(oldComp, focusComp)
    SaveChangesToDB()
  }}
>
  {#if inFocus}
    <div class="demo-container">
      <Grid
        on:pointerup={SaveChangesToDB}
        bind:items={itemsFocus}
        rowHeight={100}
        on:change={() => OnSizePositionChange(itemsFocus, 'focusMode')}
        let:item
        let:dataItem
        {cols}
        fillSpace={true}
        let:movePointerDown
      >
        <div class="demo-widget">
          {#if dataItem.empty}
            {dataItem.empty}
          {/if}
          {#if dataItem.comp}
            <svelte:component
              this={dataItem.comp}
              {inFocus}
              {getFocusElement}
              {movePointerDown}
            />
          {/if}
        </div>
      </Grid>
    </div>
  {/if}
</div>

<style>
  .focus {
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    opacity: 0;
    z-index: -5;
    transition: all 500ms;
    padding-top: 4rem;
  }
  :global(.svlt-grid-item.focusMode) {
    z-index: 100;
  }

  .resizer {
    position: absolute;
    bottom: 5px;
    right: 5px;
    cursor: move;
  }

  .demo-widget {
    background: transparent;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .demo-container {
    max-width: 1820px;
    width: 100%;
    position: relative;
  }
</style>
