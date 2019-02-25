<?php
defined('_JEXEC') or exit();

class RelationsModelRelations extends JModelList{

    const USERGROUP_STAFF   = 10;
    const USERGROUP_PARENTS   = 11;
    const USERGROUP_CHILD   = 13;
    

    protected function getListQuery(){

        $user = JFactory::getUser();

        $groups = $user->groups;

        $db = JFactory::getDbo();
        $query = $db->getQuery(TRUE);

        $query
            ->select('cmf.memberid, cmf.referenceid, cmf.reason, c.firstname, c.lastname, um.group_id ')
            ->from('#__comprofiler_members cmf')
            ->join('INNER', '#__comprofiler c ON cmf.referenceid=c.user_id AND cmf.reason IS NOT NULL')
            ->join('INNER', '#__user_usergroup_map um ON c.user_id=um.user_id AND ( um.group_id=' . self::USERGROUP_PARENTS . ' OR um.group_id=' . self::USERGROUP_CHILD . ' OR um.group_id=' . self::USERGROUP_STAFF . ')')
            ->join('INNER', '#__user_usergroup_map ums ON cmf.memberid=ums.user_id AND ( ums.group_id=' . self::USERGROUP_PARENTS . ' OR ums.group_id=' . self::USERGROUP_CHILD . ' OR ums.group_id=' . self::USERGROUP_STAFF . ')');

        return $query;
    }

    protected function populateState()
    {
        $this->setState('list.limit', 1000);
    }

}