React = require 'react'
Icon  = require '../icon/icon'
cx    = require 'classnames'

WalkDistance = (props) ->

  roundedWalkDistanceInM = Math.round(props.walkDistance/100)*100
  roundedWalkDistanceInKm = (roundedWalkDistanceInM / 1000).toFixed(1)
  walkDistance = if roundedWalkDistanceInM < 1000 then "#{roundedWalkDistanceInM}m" else "#{roundedWalkDistanceInKm}km"

  <span className={cx props.className}>
    <Icon img={'icon-icon_walk'}/>
    <span className="walk-distance">&nbsp;{walkDistance}</span>
  </span>

WalkDistance.description =
  "Displays the total walk distance of the itinerary in precision of 10 meters.
   Requires walkDistance in meters as props. Displays distance in km if distance is 1000 or above"

WalkDistance.propTypes =
  walkDistance: React.PropTypes.number.isRequired

WalkDistance.displayName = "WalkDistance"

module.exports = WalkDistance
