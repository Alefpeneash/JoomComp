<?php
defined('_JEXEC') or exit();

include_once( JPATH_ADMINISTRATOR . '/components/com_comprofiler/plugin.foundation.php' ); 

cbimport( 'cb.html' );

$controller = JControllerLegacy::getInstance('Relations');

$input = JFactory::getApplication()->input;

$controller->execute($input->get('task', 'display'));

$controller->redirect();