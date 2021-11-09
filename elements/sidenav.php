<nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library -->
        <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                    Dashboard
                    <i class="right fas fa-angle-left"></i>
                </p>
            </a>
            <ul class="nav nav-treeview">
                <li class="nav-item">
                    <a href="<?php echo $base; ?>admin/index.php" class="nav-link <?php
                    if ($fname === 'dashboard') {
                        echo 'active';
                    }
                    ?>">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Dashboard</p>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="<?php echo $base; ?>admin/dashboard.php?cms=users" class="nav-link <?php
                    if ($cms === 'users') {
                        echo 'active';
                    }
                    ?>">
                        <i class="fas fa-users nav-icon"></i>
                        <p>Users</p>
                    </a>
                </li>
            </ul>
        </li>
        <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
                <i class="nav-icon fas fa-user-shield"></i>
                <p>
                    Personal info
                    <i class="right fas fa-angle-left"></i>
                </p>
            </a>
            <ul class="nav nav-treeview">
                <li class="nav-item">
                    <a href="<?php echo $base; ?>users/profile.php?user=pinfo" class="nav-link <?php
                    if ($user === 'pinfo') {
                        echo 'active';
                    }
                    ?>">
                        <i class="fas fa-id-card nav-icon"></i>
                        <p>Personal Info</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="<?php echo $base; ?>users/profile.php?user=sphra" class="nav-link <?php
                    if ($user === 'sphra') {
                        echo 'active';
                    }
                    ?>">
                        <i class="fas fa-user-lock nav-icon"></i>
                        <p>Secure Phrase</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="<?php echo $base; ?>users/profile.php?user=chpass" class="nav-link <?php
                    if ($user === 'chpass') {
                        echo 'active';
                    }
                    ?>">
                        <i class="fas fa-key nav-icon"></i>
                        <p>Change password</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="<?php echo $base; ?>users/profile.php?user=chpin" class="nav-link <?php
                    if ($user === 'chpin') {
                        echo 'active';
                    }
                    ?>">
                        <i class="nav-icon fas fa-file-alt"></i>
                        <p>
                            Change PIN                  
                        </p>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</nav>
